// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:"AIzaSyCbbParHS-jrA0DSrt-zX2l64yj7NIWpkU",
    authDomain:"bookmarkmanegar.firebaseapp.com",
    projectId:"bookmarkmanegar",
    storageBucket: "bookmarkmanegar.appspot.com,",
    messagingSenderId: "179785553401",
    appId: "1:179785553401:web:0509daa0b771a6002a5928"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
