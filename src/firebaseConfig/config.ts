// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Pick Firestore database by NEXT_PUBLIC_APP_ENV (must be set explicitly).
// - "development" → named DB `tuitional-website-staging-db`
// - "production"  → default DB
// Anything else (including unset) falls back to the default DB.
const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

export const db =
  appEnv === "development"
    ? getFirestore(app, "tuitional-website-staging-db")
    : getFirestore(app);
