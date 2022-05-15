import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMKtpdolBGZmH8roiYlFl4v5XT1Jz612w",
  authDomain: "climbing-database-c1ada.firebaseapp.com",
  projectId: "climbing-database-c1ada",
  storageBucket: "climbing-database-c1ada.appspot.com",
  messagingSenderId: "68732980387",
  appId: "1:68732980387:web:253153bb031d1e0cb10316",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
