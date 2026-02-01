import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDr7EeC_MxrCrZSTSoBtsnISzDdv9HqmLo',
  authDomain: 'codee-bf115.firebaseapp.com',
  projectId: 'codee-bf115',
  storageBucket: 'codee-bf115.firebasestorage.app',
  messagingSenderId: '228085013798',
  appId: '1:228085013798:web:203c42a98a2e1747d135e7'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const ensureSignedIn = async () => {
  if (auth.currentUser) return auth.currentUser;
  const credential = await signInAnonymously(auth);
  return credential.user;
};

export { app, db, auth, ensureSignedIn, onAuthStateChanged, signInWithEmailAndPassword, signOut };
