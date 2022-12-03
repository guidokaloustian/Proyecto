// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv9rwDEf-TzG3aV7coI6C6mtZza7K2Od0",
  authDomain: "proyecto-coder-642e6.firebaseapp.com",
  projectId: "proyecto-coder-642e6",
  storageBucket: "proyecto-coder-642e6.appspot.com",
  messagingSenderId: "746634495610",
  appId: "1:746634495610:web:3f12dd6c8ec2aeaad25dc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);