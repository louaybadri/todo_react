// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { ref, getDatabase, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyC13R_U5jdqrRKU8O3WomrBDAQpOmytHQ0",

    authDomain: "todo-868b7.firebaseapp.com",

    projectId: "todo-868b7",

    storageBucket: "todo-868b7.appspot.com",

    messagingSenderId: "122431907529",

    appId: "1:122431907529:web:f07599a46f2515e4f40f18"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
