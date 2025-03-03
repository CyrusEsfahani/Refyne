import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQ8iAnf7p6nKp4_i82lXDRX5369iZVw5c",
    authDomain: "refyne-b6ff6.firebaseapp.com",
    projectId: "refyne-b6ff6",
    storageBucket: "refyne-b6ff6.firebasestorage.app",
    messagingSenderId: "871984342996",
    appId: "1:871984342996:web:3079b72f71118a445dd841",
    measurementId: "G-GT2GCEMCPF"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);