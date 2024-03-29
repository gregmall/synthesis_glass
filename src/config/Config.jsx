import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY ,
  authDomain: process.env.REACT_APP_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_SENDER_ID ,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID


};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


export { auth, db, storage }