import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyDt6vfeisIfTSfvmVwCLCSJ9QOu7D22vQc",
    authDomain: "cheat-sheet-12b28.firebaseapp.com",
    projectId: "cheat-sheet-12b28",
    storageBucket: "cheat-sheet-12b28.appspot.com",
    messagingSenderId: "355016717653",
    appId: "1:355016717653:web:d0fb095fa5ba0639e66bdc"
  };
  // Initialize Firebase
const database = firebase.initializeApp(firebaseConfig);
const auth = database.auth();
const firestore = database.firestore();
export {
  auth,
  firestore
} 