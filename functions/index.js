const admin = require('firebase-admin');
const { onDocumentCreated, onDocumentDeleted } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

admin.initializeApp();
const db = admin.firestore();

const updateCount = async (postId, field, delta) => {
  const postRef = db.collection('posts').doc(postId);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(postRef);
    if (!snap.exists) return;
    const data = snap.data() || {};
    const current = typeof data[field] === 'number' ? data[field] : 0;
    const next = Math.max(current + delta, 0);
    tx.update(postRef, { [field]: next });
  });
};

exports.onLikeCreated = onDocumentCreated('posts/{postId}/likes/{uid}', async (event) => {
  const postId = event.params.postId;
  await updateCount(postId, 'likeCount', 1);
});

exports.onLikeDeleted = onDocumentDeleted('posts/{postId}/likes/{uid}', async (event) => {
  const postId = event.params.postId;
  await updateCount(postId, 'likeCount', -1);
});

exports.onReplyCreated = onDocumentCreated('posts/{postId}/replies/{replyId}', async (event) => {
  const postId = event.params.postId;
  await updateCount(postId, 'replyCount', 1);
});

exports.onReplyDeleted = onDocumentDeleted('posts/{postId}/replies/{replyId}', async (event) => {
  const postId = event.params.postId;
  await updateCount(postId, 'replyCount', -1);
});

const mockPostBodies = [
  'Quick update: just finished a deep dive into CSS grid. It finally clicked.',
  'Any tips on staying consistent with coding practice?',
  'I built a small dashboard this weekend — learned a lot about state management.',
  'Debugging all night, but the fix was one line. Worth it.',
  'Working through algorithm practice. Progress feels slow but steady.'
];

const mockCategories = ['general', 'python', 'html', 'help', 'memes'];

exports.seedMockPosts = onCall(async (request) => {
  const secret = request.data?.secret;
  if (!secret || secret !== process.env.SEED_SECRET) {
    throw new HttpsError('permission-denied', 'Missing or invalid seed secret.');
  }
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Must be signed in.');
  }

  const usersSnap = await db.collection('users').get();
  const batch = db.batch();
  let created = 0;

  usersSnap.forEach((docSnap) => {
    const data = docSnap.data() || {};
    const authUid = data.uid || docSnap.id;
    if (authUid === request.auth.uid) return;

    const postCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < postCount; i += 1) {
      const postRef = db.collection('posts').doc();
      const body = mockPostBodies[(created + i) % mockPostBodies.length];
      const category = mockCategories[(created + i) % mockCategories.length];
      batch.set(postRef, {
        authorId: authUid,
        body,
        category,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        likeCount: 0,
        replyCount: 0,
        status: 'published'
      });
      created += 1;
    }
  });

  await batch.commit();
  return { created };
});
