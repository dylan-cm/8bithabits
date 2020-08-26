import React, { Component } from 'react'
import firebase from '../utils/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { withRouter } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/logo.svg'

const S: Styles.Component = Styles
S.LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .logo {
    width: 100px;
  }
`

interface PropTypes {
  // React Router
  history: any
  match: any
  location: any
}

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

  async redirect(msDelay: number) {
    await new Promise((resolve) => setTimeout(resolve, msDelay))
    this.props.history.push('/')
  }

  render() {
    this.state.isSignedIn && this.redirect(3000)
    return (
      <S.LoginPageContainer>
        <Logo className="logo" />
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn && (
          <>
            <h1>Sign in or sign up</h1>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </>
        )}
        {this.state.isSignedIn && (
          <>
            <h1>Hello {firebase.auth().currentUser?.displayName}. You are now signed In!</h1>
            <p>
              {'You should be redirceted in 3 seconds... if not '}
              <a href=" " onClick={() => this.props.history.push('/')}>
                click here
              </a>
            </p>
            <br />
            <a href=" " onClick={() => firebase.auth().signOut()}>
              Sign-out
            </a>
          </>
        )}
      </S.LoginPageContainer>
    )
  }
}

export default withRouter(LoginPage)
