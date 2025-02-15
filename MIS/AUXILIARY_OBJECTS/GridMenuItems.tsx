import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const secondaryFirebaseConfig = {
    apiKey: "AIzaSyBW8bB8mIouZe6utEDv4T3kMXeC7Q08TpI",
    authDomain: "grid-menu-items-583be.firebaseapp.com",
    projectId: "grid-menu-items-583be",
    storageBucket: "grid-menu-items-583be.firebasestorage.app",
    messagingSenderId: "258783539762",
    appId: "1:258783539762:web:b9e6ebedfaa804dd87022b",
    measurementId: "G-V72RZ7BEND"
  };
  
  // Initialize the second Firebase app with a custom name
  const secondaryApp = getApps().find(app => app.name === "secondary")
    ? getApp("secondary")
    : initializeApp(secondaryFirebaseConfig, "secondary");
  
  const secondaryDb = getFirestore(secondaryApp);

  export {secondaryApp, secondaryDb}
