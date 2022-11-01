// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {FIREBASE_KEY} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "workout-app-ed4c7.firebaseapp.com",
  projectId: "workout-app-ed4c7",
  storageBucket: "workout-app-ed4c7.appspot.com",
  messagingSenderId: "683316815328",
  appId: "1:683316815328:web:db634147161bcd84757785",
  measurementId: "G-5NKC02Z8TS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();