import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/functions' // <- needed if using httpsCallable
// import 'firebase/database'

const config = {
  apiKey: 'AIzaSyD3xp0DwQWt47l1qoPEnNuYSA9s_g1bTBs',
  authDomain: 'habit-8bit.firebaseapp.com',
  databaseURL: 'https://habit-8bit.firebaseio.com',
  projectId: 'habit-8bit',
  storageBucket: 'habit-8bit.appspot.com',
  messagingSenderId: '837835217815',
  appId: '1:837835217815:web:3ada183fecae9dc22802d2',
  measurementId: 'G-D4HD789HLP',
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

firebase.initializeApp(config)
// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

export default firebase
