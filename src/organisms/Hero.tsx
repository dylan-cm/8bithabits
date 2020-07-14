import React from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'

const S: Styles.Component = Styles
S.Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  min-height: Calc(100vh - 115px);

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 48px;
    font-family: 'ITC Avant Garde Gothic Pro', sans-serif;
  }

  div.hero-body {
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  @media screen and (max-width: 275px) {
    h1 {
      font-size: 2rem;
    }
  }
`

function Hero() {
  return (
    <S.Hero>
      <div className="hero-body">
        <h1>Designer, Full-Stack Developer & Consultant</h1>
        <h3>I design and build simply useful things, and I love what I do.</h3>
      </div>
    </S.Hero>
  )
}

export default Hero
