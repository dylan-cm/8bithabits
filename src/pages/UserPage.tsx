import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import firebase from '../utils/firebase'

import { getUserStats, deleteUser } from '../redux/actions/firebaseActions'
import OutlinedButton from '../atoms/OutlinedButton'

const S: Styles.Component = Styles
S.UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  min-height: 100vh;
  width: 100vw;

  padding: 0 100px;
  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};
  box-sizing: border-box;
  color: ${(props) => props.theme.color.positive};

  img {
    width: 100px;
    border-radius: 100px;
  }
`

interface PropTypes {
  user: { [key: string]: any }
  getUserStats: (currentUser: firebase.User | null) => void
  deleteUser: () => void
}

class UserPage extends Component<PropTypes> {
  componentDidMount() {
    this.props.getUserStats(firebase.auth().currentUser)
  }
  render() {
    const { user } = this.props
    return (
      <S.UserPageContainer>
        {user ? (
          <>
            <h1>{'Hello ' + user.displayName || 'There!'}</h1>
            <img src={user.photoURL || ''} alt="user avatar" />
            <p>
              <span>Email: </span>
              {user.email}
            </p>
            <p>
              <span>Verified: </span>
              {user.emailVerified ? '✔' : 'x'}
            </p>
            <p>
              <span>Last Sign In: </span>
              {user.lastSignInTime}
            </p>
            <p>
              <span>User Since: </span>
              {user.creationTime}
            </p>
            <h3>{`You have ${user.habits} habits.`}</h3>
            <h3>{`You have ${user.sequences} sequences.`}</h3>
            <OutlinedButton color="#ff0000" onClick={deleteUser}>
              Delete
            </OutlinedButton>
            <p>VERY DANGEROUS. NO CONFIRMATION.</p>
          </>
        ) : (
          <h1>Loading user information...</h1>
        )}
      </S.UserPageContainer>
    )
  }
}

interface StateType {
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    user: state.firebase.userStats,
  }
}

const mapDispatchToProps = {
  getUserStats,
  deleteUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
