// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "app-d9c27.firebaseapp.com",
  databaseURL: "https://app-d9c27-default-rtdb.firebaseio.com",
  projectId: "app-d9c27",
  storageBucket: "app-d9c27.appspot.com",
  messagingSenderId: "258918647957",
  appId: "1:258918647957:web:1c2824c458cac73fa4739c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
