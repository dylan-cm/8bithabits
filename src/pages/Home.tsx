import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'

import Hero from '../organisms/Hero'
import Introduction from '../organisms/Introduction'
import Works from '../organisms/Works'

import { incrementIfOdd, increment, decrement } from '../redux/actions/counter'

const S: Styles.Component = Styles
S.HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};

  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {
  counter: number
  incrementIfOdd: () => void
  increment: () => void
  decrement: () => void
}

class Home extends Component<PropTypes> {
  render() {
    // const { } = this.props
    return (
      <S.HomeContainer>
        <Hero />
        <Introduction />
        <Works />
      </S.HomeContainer>
    )
  }
}

interface StateType {
  counter: number
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps = {
  incrementIfOdd,
  increment,
  decrement,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
