// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:"AIzaSyBhlhCJ_i8L_s3kb1wHyGhDETSag1CNKvk",
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MASSEGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
