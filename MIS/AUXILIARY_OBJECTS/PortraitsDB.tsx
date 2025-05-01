import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const thirdFirebaseConfig = {
  apiKey: "AIzaSyDHr4iMg3HYJuWkODHczfqR4lPAZuYr5hI",
  authDomain: "portrait-data.firebaseapp.com",
  projectId: "portrait-data",
  storageBucket: "portrait-data.firebasestorage.app",
  messagingSenderId: "78857993195",
  appId: "1:78857993195:web:d8e45b29f28b2b3019b7ae",
  measurementId: "G-7X993G10RH"
  };

  // Initialize the second Firebase app with a custom name
  const thirdApp = getApps().find(app => app.name === "secondary")
    ? getApp("secondary")
    : initializeApp(thirdFirebaseConfig, "secondary");
  
  const thirdDb = getFirestore(thirdApp);

  export {thirdApp, thirdDb}