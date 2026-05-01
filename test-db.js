import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);

async function test() {
  try {
    console.log("Fetching products...");
    const snap = await getDocs(collection(db, "products"));
    console.log(`Found ${snap.size} products.`);
    snap.forEach(doc => {
      console.log(doc.id, "=>", doc.data().name);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
