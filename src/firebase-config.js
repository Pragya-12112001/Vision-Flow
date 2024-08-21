// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage" ;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFLcV1fLDll-By4TwEqyuMoCyn77h9AEw",
  authDomain: "imagegeneration-546b2.firebaseapp.com",
  projectId: "imagegeneration-546b2",
  storageBucket: "imagegeneration-546b2.appspot.com",
  messagingSenderId: "407989093772",
  appId: "1:407989093772:web:ad154904eccc8d2948c2a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const Provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const API_TOKEN = "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";
