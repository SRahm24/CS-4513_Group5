import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS5c1hC7oDqDnutJnW4CJoHy1If5fmXEE",
  authDomain: "serverbuddy-3daa7.firebaseapp.com",
  projectId: "serverbuddy-3daa7",
  storageBucket: "serverbuddy-3daa7.appspot.com",
  messagingSenderId: "794480954381",
  appId: "1:794480954381:web:62914f7bf724e184ced944",
  measurementId: "G-ZH0QMHLEVR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);