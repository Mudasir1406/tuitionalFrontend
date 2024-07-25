// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRwFZw7L6q0nmMl-b7txQKJn4QGAZByWw",
  authDomain: "tuitional-website.firebaseapp.com",
  projectId: "tuitional-website",
  storageBucket: "tuitional-website.appspot.com",
  messagingSenderId: "570490820234",
  appId: "1:570490820234:web:a647436cc5c616c9cebf73",
  measurementId: "G-09VTGDNS1Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
