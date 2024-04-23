import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBy-0vXVu6OUHFEQF-CuNBf4-2gZNw0Egw",
  authDomain: "post-2fde3.firebaseapp.com",
  projectId: "post-2fde3",
  storageBucket: "post-2fde3.appspot.com",
  messagingSenderId: "311117691461",
  appId: "1:311117691461:web:36eec6bfd8cad1460d812c",
  measurementId: "G-EYQJ47L1TL",
};

let firebaseApp =
  getApps.length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
