
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBT3EhmRF_Lr80NTJ5Xw6wHN6uzv4Jqjzk",
  authDomain: "messenger-40dee.firebaseapp.com",
  projectId: "messenger-40dee",
  storageBucket: "messenger-40dee.appspot.com",
  messagingSenderId: "912768766309",
  appId: "1:912768766309:web:46bb94f5c252b1b640118c",
  measurementId: "G-NCXWG21FK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);