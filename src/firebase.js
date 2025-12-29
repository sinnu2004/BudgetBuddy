
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {  getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcE0BsIa0K3J_h_KaG44KeAkBDZfLpwD8",
  authDomain: "budgetbuddy-479ae.firebaseapp.com",
  projectId: "budgetbuddy-479ae",
  storageBucket: "budgetbuddy-479ae.firebasestorage.app",
  messagingSenderId: "57176330366",
  appId: "1:57176330366:web:f022359dce5e05b3ffc82f",
  measurementId: "G-PH6T8BLGPV"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { app, db, authProvider }