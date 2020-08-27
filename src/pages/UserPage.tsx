import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'

import { getUserData, deleteUser } from '../redux/actions/firebaseActions.js'
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
  getUserData: () => void
  deleteUser: () => void
}

class UserPage extends Component<PropTypes> {
  componentDidMount() {
    if (!(this.props.user && this.props.user.email)) this.props.getUserData()
  }
  render() {
    const { user, deleteUser } = this.props
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
            <h3>{`You have ${user.habits ? user.habits.length : 0} habits.`}</h3>
            <h3>{`You have ${user.sequences ? user.sequences.length : 0} sequences.`}</h3>
            <OutlinedButton color="#ff0000" onClick={() => deleteUser()}>
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
    user: state.firebase.userData,
  }
}

const mapDispatchToProps = {
  getUserData,
  deleteUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
