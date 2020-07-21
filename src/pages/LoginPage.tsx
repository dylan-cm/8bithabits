import React, { Component } from 'react'
import firebase from '../utils/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Link } from 'react-router-dom'

interface PropTypes {}

class LoginPage extends Component<PropTypes> {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  state = {
    isSignedIn: undefined,
  }

  unregisterAuthObserver: any

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user })
    })
  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    return (
      <div>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn && (
          <div>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        )}
        {this.state.isSignedIn && (
          <div>
            Hello {firebase.auth().currentUser?.displayName}. You are now signed In!
            <Link to="/">Continue</Link>
            <a href=" " onClick={() => firebase.auth().signOut()}>
              Sign-out
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default LoginPage
