import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import {
  updateSequence,
  deleteSequence,
  onNewSequenceChange,
  loadSequenceEditor,
  resetSequenceEditor,
} from '../redux/actions/firebaseActions.js'
// import SequenceEditor from '../organisms/SequenceEditor'
import { withRouter } from 'react-router'
import OutlinedButton from '../atoms/OutlinedButton'
import SequenceEditor from '../organisms/SequenceEditor'

const S: Styles.Component = Styles
S.UpdateSequenceContainer = styled.div`
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
  onNewSequenceChange: (title?: string, coolDownAmt?: number, coolDownUnit?: string) => void
  updateSequence: (habitId: string) => void
  deleteSequence: (habitId: string) => void
  loadSequenceEditor: (habitId: string) => void
  resetSequenceEditor: () => void
  // react router
  match: any
  location: any
  history: any
}

class UpdateSequence extends Component<PropTypes> {
  componentDidMount() {
    // load sequnce to state
    let id = this.props.match.params.id
    this.props.loadSequenceEditor(id)
  }
  render() {
    return (
      <S.UpdateSequenceContainer>
        <SequenceEditor
          onNewSequenceChange={this.props.onNewSequenceChange}
          title={this.props.title}
          habits={this.props.habits}
        />
        <OutlinedButton
          onClick={(_) => {
            this.props.updateSequence(this.props.match.params.id)
            this.props.resetSequenceEditor()
            this.props.history.push('/')
          }}
        >
          Save Sequence
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.resetSequenceEditor()
            this.props.history.push('/')
          }}
        >
          Cancel
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.deleteSequence(this.props.match.params.id)
            this.props.resetSequenceEditor()
            this.props.history.push('/')
          }}
        >
          Delete Sequence *dangerous
        </OutlinedButton>
      </S.UpdateSequenceContainer>
    )
  }
}

interface StateType {
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    title: state.firebase.newSequence.title,
    habits: state.firebase.newSequence.habits,
  }
}

const mapDispatchToProps = {
  updateSequence,
  deleteSequence,
  onNewSequenceChange,
  loadSequenceEditor,
  resetSequenceEditor,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateSequence))
