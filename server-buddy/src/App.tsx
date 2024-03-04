

import './App.css'
import * as React from 'react';
import Drawer from './UI/Drawer.tsx'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS5c1hC7oDqDnutJnW4CJoHy1If5fmXEE",
  authDomain: "serverbuddy-3daa7.firebaseapp.com",
  projectId: "serverbuddy-3daa7",
  storageBucket: "serverbuddy-3daa7.appspot.com",
  messagingSenderId: "794480954381",
  appId: "1:794480954381:web:62914f7bf724e184ced944",
  measurementId: "G-ZH0QMHLEVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App(){
  return (
    <Drawer />
  )
};

export default App;
