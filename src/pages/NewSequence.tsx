import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { addSequence, onNewSequenceChange, resetSequenceEditor, getHabits } from '../redux/actions/firebaseActions.js'
import { withRouter } from 'react-router'
import OutlinedButton from '../atoms/OutlinedButton'
import SequenceEditor from '../organisms/SequenceEditor'

const S: Styles.Component = Styles
S.NewSequenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};

  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {
  title: string
  habits: any[]
  onNewSequenceChange: (title?: string, coolDownAmt?: number, coolDownUnit?: string, habitList?: any[]) => void
  addSequence: () => void
  resetSequenceEditor: () => void
  getHabits: () => void
  // react router
  match: any
  location: any
  history: any
}

class NewSequence extends Component<PropTypes> {
  componentDidMount() {
    this.props.resetSequenceEditor()
    this.props.getHabits()
  }
  render() {
    return (
      <S.NewSequenceContainer>
        <SequenceEditor
          onNewSequenceChange={this.props.onNewSequenceChange}
          title={this.props.title}
          habits={this.props.habits}
        />
        <OutlinedButton
          onClick={(_) => {
            this.props.addSequence()
            this.props.resetSequenceEditor()
            this.props.history.push('/')
          }}
        >
          Save New Sequence
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.resetSequenceEditor()
            this.props.history.push('/')
          }}
        >
          Cancel
        </OutlinedButton>
      </S.NewSequenceContainer>
    )
  }
}

interface StateType {
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    title: state.firebase.newSequence.title,
    habits: state.firebase.habits,
  }
}

const mapDispatchToProps = {
  addSequence,
  onNewSequenceChange,
  resetSequenceEditor,
  getHabits,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewSequence))
