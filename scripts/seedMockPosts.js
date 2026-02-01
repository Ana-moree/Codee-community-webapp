/*
Usage (PowerShell):
  $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\path\to\serviceAccount.json"
  node scripts\seedMockPosts.js

Optional:
  $env:SEED_POSTS_PER_USER = "2"
  $env:SEED_EXCLUDE_UID = "<authUidToSkip>"
  $env:SEED_FOLLOWS = "true"
  $env:SEED_FOLLOWS_MIN = "1"
  $env:SEED_FOLLOWS_MAX = "3"
*/

const admin = require('firebase-admin');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Missing GOOGLE_APPLICATION_CREDENTIALS env var.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const mockPostBodies = [
  'Quick update: just finished a deep dive into CSS grid. It finally clicked.',
  'Any tips on staying consistent with coding practice?',
  'I built a small dashboard this weekend — learned a lot about state management.',
  'Debugging all night, but the fix was one line. Worth it.',
  'Working through algorithm practice. Progress feels slow but steady.',
  'Learning async patterns is tricky, but I am making progress.',
  'Just refactored a component into smaller pieces. Feels cleaner.'
];

const mockCategories = ['general', 'python', 'html', 'help', 'memes'];

const postsPerUser = Math.max(1, parseInt(process.env.SEED_POSTS_PER_USER || '2', 10));
const excludeUid = process.env.SEED_EXCLUDE_UID || '';
const seedFollows = (process.env.SEED_FOLLOWS || '').toLowerCase() === 'true';
const followsMin = Math.max(0, parseInt(process.env.SEED_FOLLOWS_MIN || '1', 10));
const followsMax = Math.max(followsMin, parseInt(process.env.SEED_FOLLOWS_MAX || '3', 10));

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const batchWrite = async (operations) => {
  let batch = db.batch();
  let count = 0;
  for (const op of operations) {
    batch.set(op.ref, op.data, { merge: op.merge });
    count += 1;
    if (count >= 450) {
      await batch.commit();
      batch = db.batch();
      count = 0;
    }
  }
  if (count > 0) {
    await batch.commit();
  }
};

const main = async () => {
  const usersSnap = await db.collection('users').get();
  const users = [];

  usersSnap.forEach((docSnap) => {
    const data = docSnap.data() || {};
    const authUid = data.uid || docSnap.id;
    if (excludeUid && authUid === excludeUid) return;
    users.push({
      uid: authUid,
      username: data.username || docSnap.id
    });
  });

  const postOps = [];
  let createdPosts = 0;

  users.forEach((user) => {
    for (let i = 0; i < postsPerUser; i += 1) {
      const postRef = db.collection('posts').doc();
      const body = mockPostBodies[(createdPosts + i) % mockPostBodies.length];
      const category = mockCategories[(createdPosts + i) % mockCategories.length];
      postOps.push({
        ref: postRef,
        data: {
          authorId: user.uid,
          body,
          category,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          likeCount: 0,
          replyCount: 0,
          status: 'published'
        }
      });
      createdPosts += 1;
    }
  });

  await batchWrite(postOps);

  let createdFollows = 0;
  if (seedFollows && users.length > 1) {
    const followOps = [];
    users.forEach((user) => {
      const targets = shuffle(users.filter((u) => u.uid !== user.uid));
      const followCount = Math.min(
        targets.length,
        followsMin + Math.floor(Math.random() * (followsMax - followsMin + 1))
      );

      for (let i = 0; i < followCount; i += 1) {
        const target = targets[i];
        const followingRef = db
          .collection('users')
          .doc(user.uid)
          .collection('following')
          .doc(target.uid);
        const followerRef = db
          .collection('users')
          .doc(target.uid)
          .collection('followers')
          .doc(user.uid);

        followOps.push({
          ref: followingRef,
          data: {
            uid: target.uid,
            username: target.username,
            handle: `@${target.username}`,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          }
        });
        followOps.push({
          ref: followerRef,
          data: {
            uid: user.uid,
            username: user.username,
            handle: `@${user.username}`,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          }
        });
        createdFollows += 1;
      }
    });

    await batchWrite(followOps);
  }

  console.log(`Created ${createdPosts} mock posts.`);
  if (seedFollows) {
    console.log(`Created ${createdFollows} follow relationships.`);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
