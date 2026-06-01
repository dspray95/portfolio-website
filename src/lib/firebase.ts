import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTJormVLynwVYNLg472AXfc0sfvKRG8Aw",
  authDomain: "david-spray.firebaseapp.com",
  databaseURL: "https://david-spray.firebaseio.com",
  projectId: "david-spray",
  storageBucket: "david-spray.firebasestorage.app",
  messagingSenderId: "457225210518",
  appId: "1:457225210518:web:98619254a225ce101950b7",
  measurementId: "G-KK25RR1C65",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
