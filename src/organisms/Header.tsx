import React from 'react'
import firebase from '../utils/firebase'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { ReactComponent as Logo } from '../assets/logo.svg'
import OutlinedButton from '../atoms/OutlinedButton'
import { useHistory } from 'react-router'

const S: Styles.Component = Styles
S.Header = styled.div`
  position: absolute;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: ${(props) => props.theme.layout.headerHeightDesktop};
  width: 100%;

  padding: 16px 48px;
  box-sizing: border-box;

  .logo {
    height: 60%;
    fill: ${(props) => props.theme.color.primary};
    transition: 250ms;
    cursor: pointer;

    &:hover {
      fill: ${(props) => props.theme.color.positive};
    }
  }

  div.nav-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    width: 100%;
    max-width: 1344px;
  }
`

function Header() {
  let history = useHistory()
  return (
    <S.Header>
      <div className="nav-wrapper">
        {/* Logo */}
        <Logo className="logo" onClick={() => history.push('/')} />
        <OutlinedButton children="New Sequence" onClick={() => history.push('/new-sequence')} />
        <OutlinedButton children="New Habit" onClick={() => history.push('/new')} />
        <a href=" " onClick={() => history.push('/user')}>
          Account
        </a>
        <a href=" " onClick={() => firebase.auth().signOut()}>
          Sign-out
        </a>
      </div>
    </S.Header>
  )
}

export default Header
