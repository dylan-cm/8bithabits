import React from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { useHistory } from 'react-router'
import OutlinedButton from '../atoms/OutlinedButton'
import { ReactComponent as Logo } from '../assets/logo.svg'

const S: Styles.Component = Styles
S.Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;

  text-align: center;
  color: ${(props) => props.theme.color.negative};
  padding: 0 16px;
  box-sizing: border-box;

  h2 {
    font-size: 2.25rem;
    font-weight: 600;
    margin-bottom: 16px;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    padding: 4px 32px;
    @media screen and (max-width: 1020px) {
      padding: 0px;
    }
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 8px;
    color: ${(props) => props.theme.color.primary};
    font-family: itc-avant-garde-gothic-pro, sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  h6 {
    max-width: 800px;
    font-size: 1.15rem;
    line-height: 1.5rem;
    margin: 0;
    font-family: itc-avant-garde-gothic-pro, sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  div.color-bar {
    z-index: -1;
    position: absolute;
    margin-top: 132px;
    padding-bottom: 100px;
    width: 100%;
    height: 700px;
    background: ${(props) => props.theme.color.primary};
  }

  div.dark-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    color: ${(props) => props.theme.color.negative};
    max-width: 1200px;
    width: 100%;
    background: ${(props) => props.theme.color.positive};
    border-radius: 10px;

    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

    padding: 48px 96px;
    margin: 48px 16px;
    box-sizing: border-box;

    text-align: center;

    @media screen and (max-width: 1020px) {
      padding: 48px 32px;
    }

    @media screen and (max-width: 800px) {
      flex-direction: column;
      max-width: 600px;
      .mobile-pad {
        margin-bottom: 32px;
      }
    }
  }

  .logo {
    height: 64px;
    fill: ${(props) => props.theme.color.negative};
    transition: 250ms;
    margin: 48px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .spaced-out {
      margin: 48px 8px;
    }
    @media screen and (max-width: 275px) {
      flex-direction: column;
      justify-content: flex-start;
      .spaced-out {
        margin: 8px;
      }
    }
  }

  .quote {
    max-width: 350px;
  }
`

function Footer() {
  let history = useHistory()
  return (
    <S.Footer>
      <div className="color-bar" />
      <div className="dark-card">
        <h1>Start a project</h1>
        <p className="mobile-pad">
          Interested in working together?
          <br />
          Let's chat.
        </p>
        <OutlinedButton onClick={() => history.push('/contact')} transparent>
          <h4>Let's do this</h4>
        </OutlinedButton>
      </div>
      <Logo className="logo" />
      <div className="quote">
        <h4>Living, learning, & leveling up one day at a time.</h4>
      </div>
      <div className="row">
        {/* TODO: add links */}
        <OutlinedButton
          onClick={() => window.open('https://www.google.com')}
          inverted
          icon
          className="spaced-out"
        ></OutlinedButton>
        <OutlinedButton
          onClick={() => window.open('https://www.google.com')}
          inverted
          icon
          className="spaced-out"
        ></OutlinedButton>
        <OutlinedButton onClick={() => history.push('/contact')} inverted icon className="spaced-out"></OutlinedButton>
      </div>
      <p>Made with {'\u{2665}'} by DMCDCM © 2020</p>
    </S.Footer>
  )
}

export default Footer
