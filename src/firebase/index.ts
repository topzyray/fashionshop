import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fashionshop-b5163.firebaseapp.com",
  projectId: "fashionshop-b5163",
  storageBucket: "fashionshop-b5163.appspot.com",
  messagingSenderId: "559624918374",
  appId: "1:559624918374:web:fb0bc36e6283bcef5aa4a7",
  measurementId: "G-VTDXFSDJGY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firebase storage url
export const firebaseStorageUrl = "gs://fashionshop-b5163.appspot.com";
