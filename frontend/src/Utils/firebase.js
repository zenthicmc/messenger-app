import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: process.env.REACT_APP_apiKey,
   authDomain: process.env.REACT_APP_authDomain,
   projectId: process.env.REACT_APP_projectId,
   storageBucket: process.env.REACT_APP_storageBucket,
   messagingSenderId: process.env.REACT_APP_messagingSenderId,
   appId: process.env.REACT_APP_appId,
   measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);