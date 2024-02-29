import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcRve2sqZ8rSX5uzFSMcST0aN2YPa-mo0',
  authDomain: 'instagramclone-app-2a835.firebaseapp.com',
  projectId: 'instagramclone-app-2a835',
  storageBucket: 'instagramclone-app-2a835.appspot.com',
  messagingSenderId: '126309047109',
  appId: '1:126309047109:web:4d61719eb4c995a6153c2c',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
