// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdiP81cYGtVQiiAE0FjykF3qBaq-jExpc",
  authDomain: "chat-app-e793f.firebaseapp.com",
  projectId: "chat-app-e793f",
  storageBucket: "chat-app-e793f.appspot.com",
  messagingSenderId: "752585075112",
  appId: "1:752585075112:web:a4f939b0f5fc981238959d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
