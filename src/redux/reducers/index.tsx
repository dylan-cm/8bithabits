import { combineReducers } from 'redux'
import habit from './firebaseReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  firebase: habit, //TODO: Rename firebaseReducer to habitReducer
  firestore: firestoreReducer,
  firebaseReducer: firebaseReducer,
})

export default rootReducer
