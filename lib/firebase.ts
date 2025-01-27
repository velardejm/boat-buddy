// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvmgACCy9RRQYYRv20PLwX3CiW9tfb-rI",
  authDomain: "boat-buddy-99494.firebaseapp.com",
  projectId: "boat-buddy-99494",
  storageBucket: "boat-buddy-99494.firebasestorage.app",
  messagingSenderId: "506905436206",
  appId: "1:506905436206:web:385960404fb9f67c75bfbf",
  measurementId: "G-LMFYGXBJTE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDvmgACCy9RRQYYRv20PLwX3CiW9tfb-rI",
//   authDomain: "boat-buddy-99494.firebaseapp.com",
//   projectId: "boat-buddy-99494",
//   storageBucket: "boat-buddy-99494.firebasestorage.app",
//   messagingSenderId: "506905436206",
//   appId: "1:506905436206:web:385960404fb9f67c75bfbf",
//   measurementId: "G-LMFYGXBJTE",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
