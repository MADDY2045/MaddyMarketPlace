// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC-AB-7ffmWIApxgQf1nWwMLh-uDgjoKhw",
  authDomain: "house-marketplace-app-bafba.firebaseapp.com",
  projectId: "house-marketplace-app-bafba",
  storageBucket: "house-marketplace-app-bafba.appspot.com",
  messagingSenderId: "839073557468",
  appId: "1:839073557468:web:e757cd65b42d4ab3f53d19"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();