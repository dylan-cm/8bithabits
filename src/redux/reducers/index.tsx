import { combineReducers } from 'redux'
import counter from './counterReducer'
import habit from './firebaseReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  counter: counter,
  firebase: habit, //TODO: Rename firebaseReducer to habitReducer
  firestore: firestoreReducer,
  firebaseReducer: firebaseReducer,
})

export default rootReducer
