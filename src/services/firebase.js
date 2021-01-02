import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const fb = firebase
  .initializeApp({
    apiKey: "AIzaSyDLFFKwP-dTm3uHff2H2Wgan_0M_Kjll4M",
    authDomain: "mypuskesmas.firebaseapp.com",
    projectId: "mypuskesmas",
    storageBucket: "mypuskesmas.appspot.com",
    messagingSenderId: "1061880395916",
    appId: "1:1061880395916:web:179782bdd2fa32c830e3a9"
  })

const db = fb.firestore()
const auth = fb.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

const { TimeStamp } = firebase.firestore
const { increment, arrayRemove, arrayUnion, serverTimestamp } = firebase.firestore.FieldValue

export {
  db,
  auth,
  provider,
  storage,
  TimeStamp,
  serverTimestamp,
  increment,
  arrayRemove,
  arrayUnion,
}
