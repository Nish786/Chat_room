import firebase from 'firebase'


const app = firebase.initializeApp({
  apiKey: "AIzaSyCn1yyA3UxKsW_0EzrIBbIG6h6A-aC1FVM",
  authDomain: "vue-chat-2557e.firebaseapp.com",
  projectId: "vue-chat-2557e",
  storageBucket: "vue-chat-2557e.appspot.com",
  messagingSenderId: "249512993192",
  appId: "1:249512993192:web:dc67e20cd5163c23917d9d",
  measurementId: "G-MV4TMF8RJD"
});
const auth=app.auth()
const rdb=app.database().ref()
const db = app.firestore();
export  {auth,rdb,db}

