import { combineReducers } from 'redux'
import counter from './counterReducer'
import firebase from './firebaseReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  counter: counter,
  firebase: firebase,
  firestore: firestoreReducer,
  firebaseReducer: firebaseReducer,
  auth: authReducer,
})

export default rootReducer
