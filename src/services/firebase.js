// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:"AIzaSyBhlhCJ_i8L_s3kb1wHyGhDETSag1CNKvk",
    authDomain:"new-bookmark.firebaseapp.com",
    projectId:"new-bookmark",
    storageBucket:"new-bookmark.appspot.com",
    messagingSenderId: "691801798000",
    appId:" 1:691801798000:web:cfe96c7d5bcadb85f58bb5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
