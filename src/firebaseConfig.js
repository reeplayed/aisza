import firebase from 'firebase';
import firestore from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCzuSdRVtpNzkDqnPd2NuF7x_4ZLR_92pc",
    authDomain: "stunning-ripsaw-271017.firebaseapp.com",
    databaseURL: "https://stunning-ripsaw-271017.firebaseio.com",
    projectId: "stunning-ripsaw-271017",
    storageBucket: "stunning-ripsaw-271017.appspot.com",
    messagingSenderId: "877070764919",
    appId: "1:877070764919:web:74a3eff5377b5b19666f72",
    measurementId: "G-SXFVVW8C39"
  };

  let defFirebase = firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const auth = firebase.auth()
  export default defFirebase;