"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* ---------------- CONFIG ---------------- */
const firebaseConfig = {
  apiKey: "AIzaSyDs7aCWHGl6V6_4B3_PA3NPpMLjhxJehKs",
  authDomain: "medz-9eda1.firebaseapp.com",
  projectId: "medz-9eda1",
  storageBucket: "medz-9eda1.appspot.com",
  messagingSenderId: "61765534445",
  appId: "1:61765534445:web:4e513634e1037d78d002e4",
};

/* ---------------- INIT APP (SAFE) ---------------- */
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

/* ---------------- SERVICES ---------------- */
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ ADD THIS

/* ---------------- EXPORT APP (OPTIONAL) ---------------- */
export default app;