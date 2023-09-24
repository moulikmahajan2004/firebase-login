
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAloTzCWMNLgIGzO78EOU4aQ0TV0nLOrkE",
  authDomain: "fir-login-df493.firebaseapp.com",
  projectId: "fir-login-df493",
  storageBucket: "fir-login-df493.appspot.com",
  messagingSenderId: "812797688399",
  appId: "1:812797688399:web:ef468a950dfe1de249c83a",
  measurementId: "G-XPZ55ZVZDV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {db, auth}