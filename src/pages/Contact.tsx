import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import OutlinedButton from '../atoms/OutlinedButton'

const S: Styles.Component = Styles
S.ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};

  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {}

class Contact extends Component<PropTypes> {
  render() {
    // const { } = this.props
    return (
      <S.ContactContainer>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea cols={40} rows={5} placeholder="Message" />
        <OutlinedButton onClick={() => console.log('do something')}>Contact</OutlinedButton>
      </S.ContactContainer>
    )
  }
}

interface StateType {
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
