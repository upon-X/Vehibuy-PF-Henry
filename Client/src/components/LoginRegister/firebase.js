import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Paste your firebase config here
  apiKey: "AIzaSyCc7uuJ9LDFfLpDOpAJYzo78KBhasmPIl4",
  authDomain: "vehibuy.firebaseapp.com",
  projectId: "vehibuy",
  storageBucket: "vehibuy.appspot.com",
  messagingSenderId: "339632331417",
  appId: "1:339632331417:web:86754faa2ec7b0eb69f608",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
