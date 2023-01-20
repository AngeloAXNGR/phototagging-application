import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0KxXtWR0GIJjg2qkSeGWB76LzYYe_C6k",
  authDomain: "phototagging-application.firebaseapp.com",
  projectId: "phototagging-application",
  storageBucket: "phototagging-application.appspot.com",
  messagingSenderId: "660699981305",
  appId: "1:660699981305:web:83c089d5cceab589294928",
  measurementId: "G-91RGWP8WRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);