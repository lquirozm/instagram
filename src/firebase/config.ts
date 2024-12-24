// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgq4bIJ9OWWMT4G6pxf8r7X-3IZwaH6Sc",
  authDomain: "proyectoinstagram-faebc.firebaseapp.com",
  projectId: "proyectoinstagram-faebc",
  storageBucket: "proyectoinstagram-faebc.firebasestorage.app",
  messagingSenderId: "950176280489",
  appId: "1:950176280489:web:b5facd8245ef80ce8b5eb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)