// src/firebase.js
import firebase from 'firebase';
  // Initialize Firebase
const config = {
    apiKey: "AIzaSyB3-nsVDynoetSgW2N4ts-C1i6dBSBNwzo",
    authDomain: "create-event-ad802.firebaseapp.com",
    databaseURL: "https://create-event-ad802.firebaseio.com",
    projectId: "create-event-ad802",
    storageBucket: "",
    messagingSenderId: "751748996860"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  
  export default firebase;