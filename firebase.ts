import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-b86xSt5MIMX5s5Wpg-iK5b-IK400uic",
  authDomain: "magang-cb035.firebaseapp.com",
  projectId: "magang-cb035",
  storageBucket: "magang-cb035.firebasestorage.app",
  messagingSenderId: "5381065758",
  appId: "1:5381065758:web:9a580abbf944c05535b20f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);