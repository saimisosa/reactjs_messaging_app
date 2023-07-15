// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpjlBLn8cERGaBe0DZlZNUnrAFTDdlJWQ",
    authDomain: "message-app-75498.firebaseapp.com",
    projectId: "message-app-75498",
    storageBucket: "message-app-75498.appspot.com",
    messagingSenderId: "1021429797239",
    appId: "1:1021429797239:web:a9d78d617d69c3b3791172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);