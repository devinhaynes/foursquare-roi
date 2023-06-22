import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foursquare-2f6d6.firebaseapp.com",
  projectId: "foursquare-2f6d6",
  storageBucket: "foursquare-2f6d6.appspot.com",
  messagingSenderId: "817199170946",
  appId: "1:817199170946:web:a2849e7750a0928316fb9b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);