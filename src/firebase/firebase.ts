import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN4UlRRKuAiPYlOus42PB3vtAmEAcRbck",
  authDomain: "feedback-widget-ed1c0.firebaseapp.com",
  projectId: "feedback-widget-ed1c0",
  storageBucket: "feedback-widget-ed1c0.firebasestorage.app",
  messagingSenderId: "325949665070",
  appId: "1:325949665070:web:b06326da021ff3c80654bf",
  measurementId: "G-Q9CQ97VQG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
