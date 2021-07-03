import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCUjMsjaxcwJWtJ0qxLt5PCaus9nHeAmt0",
  authDomain: "imessageclone-81a79.firebaseapp.com",
  projectId: "imessageclone-81a79",
  storageBucket: "imessageclone-81a79.appspot.com",
  messagingSenderId: "909688628618",
  appId: "1:909688628618:web:d7a17aabf480ccf57e9473",
  measurementId: "G-LVXVSQCW87",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
