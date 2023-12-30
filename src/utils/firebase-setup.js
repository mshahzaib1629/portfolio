import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initGA } from "./googleAnalytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export let firestore;
export let fireStorage;
export let fireAuth;

export default function initializeFirebaseSDKs() {
  if (firebaseConfig.projectId) {
    const app = initializeApp(firebaseConfig);
    initGA(firebaseConfig.measurementId);
    fireAuth = getAuth(app);
    firestore = getFirestore(app);
    fireStorage = getStorage(app);
    console.log("firebase connected!");
  }
}
