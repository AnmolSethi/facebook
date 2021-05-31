import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmVOX9Q8YswB1HehHep2dj3LFJ0vI5vxY",
  authDomain: "facebook-784a3.firebaseapp.com",
  projectId: "facebook-784a3",
  storageBucket: "facebook-784a3.appspot.com",
  messagingSenderId: "711944749153",
  appId: "1:711944749153:web:a1c1423b21167a4bc4ea20",
  measurementId: "G-18EYF25M4C",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
