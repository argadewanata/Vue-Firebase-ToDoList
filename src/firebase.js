import { initializeApp } from 'firebase';
import { } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// import {firebase}  from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANC5KsxuCjnOMHRtVPy-LQhc-PgDt0Llg",
  authDomain: "pweb-todo.firebaseapp.com",
  projectId: "pweb-todo",
  storageBucket: "pweb-todo.appspot.com",
  messagingSenderId: "410037530220",
  appId: "1:410037530220:web:c0e6884f4a599b1b8cb249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initilize firestore
const projectFirestore = firebase.firestore()
export { projectFirestore }

// const db = ap.firestore()
