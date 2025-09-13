// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqYTFgAQasH59DsZ-leZopsW5b9eBXJuI",
  authDomain: "ezmall-52cc3.firebaseapp.com",
  databaseURL: "https://ezmall-52cc3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ezmall-52cc3",
  storageBucket: "ezmall-52cc3.firebasestorage.app",
  messagingSenderId: "447872795515",
  appId: "1:447872795515:web:db8feb55cf2f783bae73de",
  measurementId: "G-57FL1E2925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);