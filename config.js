// Import the functions you need from the SDKs you need
import firebase from "firebase";
require ("@firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_GwvVFYLjcX6rjZO6Oe63whE3zAWsEnc",
  authDomain: "e-library-app-61cd9.firebaseapp.com",
  projectId: "e-library-app-61cd9",
  storageBucket: "e-library-app-61cd9.appspot.com",
  messagingSenderId: "561137064431",
  appId: "1:561137064431:web:723f3a4dfb6de24194fe1a"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();