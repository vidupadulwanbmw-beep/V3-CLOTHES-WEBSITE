import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBq-LB7LvuGD_-5f_LAyoJrks5lgRxHUU",
  authDomain: "v3-clothes.firebaseapp.com",
  projectId: "v3-clothes",
  storageBucket: "v3-clothes.firebasestorage.app",
  messagingSenderId: "237863645887",
  appId: "1:237863645887:web:e713e60dc7ed0f9de44c0a",
  measurementId: "G-2LZEBSGSKF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
