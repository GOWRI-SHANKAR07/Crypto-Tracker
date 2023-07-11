import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./Config/firebase-config";

// initialising the firebase and also this is the entry point of our app..
const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);

export {auth, db};