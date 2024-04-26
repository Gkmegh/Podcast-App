// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTAfOwRkF3lfsMiB-qa7VjtnwApd93IUs",
  authDomain: "podcast-app-754aa.firebaseapp.com",
  projectId: "podcast-app-754aa",
  storageBucket: "podcast-app-754aa.appspot.com",
  messagingSenderId: "306722005533",
  appId: "1:306722005533:web:a6f2f69250baf2a0949cf4",
  measurementId: "G-ZNCD3DVHP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage }