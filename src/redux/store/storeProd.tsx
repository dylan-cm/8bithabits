import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'
import { getFirebase } from 'react-redux-firebase'

const middlewares = [ReduxThunk.withExtraArgument(getFirebase)]
// const enhancer = [applyMiddleware(...middlewares), reduxFirestore(config), reactReduxFirebase]

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares))
}
