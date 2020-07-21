import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './styles/globalStyles.css'
import * as serviceWorker from './utils/serviceWorker'
import Routes from './routes'

import firebase, { rrfConfig } from './utils/firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <StrictMode>
        <Routes />
      </StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
