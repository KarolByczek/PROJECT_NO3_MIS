import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const primaryFirebaseConfig = {
    apiKey: "AIzaSyC2lYNp66IAWL-Yjzpr9WIRUuiNqMbsuJo",
    authDomain: "mis-carousel-elements.firebaseapp.com",
    projectId: "mis-carousel-elements",
    storageBucket: "mis-carousel-elements.firebasestorage.app",
    messagingSenderId: "719513831136",
    appId: "1:719513831136:web:d26d7afb6de73d56c37285",
    measurementId: "G-27YFNYFVH6"
  };

// Ensure the primary app is only initialized once
const primaryApp = getApps().length === 0 ? initializeApp(primaryFirebaseConfig) : getApp();
const primaryDb = getFirestore(primaryApp);

export { primaryApp, primaryDb };