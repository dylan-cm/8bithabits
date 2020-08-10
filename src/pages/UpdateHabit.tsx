import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import {
  updateHabit,
  onNewHabitChange,
  loadHabitEditor,
  deleteHabit,
  resetHabitEditor,
} from '../redux/actions/firebaseActions.js'
import HabitEditor from '../organisms/HabitEditor'
import { withRouter } from 'react-router'
import OutlinedButton from '../atoms/OutlinedButton'

const S: Styles.Component = Styles
S.UpdateHabitContainer = styled.div`
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
  color: string
  icon: string
  title: string
  cue: string
  routine: string
  reward: string
  streak: 'year' | 'month' | 'week' | 'day'
  xp: number
  rp: number
  coolDownAmt: number
  coolDownUnit: 'year' | 'month' | 'week' | 'day'
  onNewHabitChange: (
    color?: string,
    icon?: string,
    title?: string,
    cue?: string,
    routine?: string,
    reward?: string,
    streak?: string,
    xp?: number,
    rp?: number,
    coolDownAmt?: number,
    coolDownUnit?: string,
  ) => void
  updateHabit: (habitId: string) => void
  loadHabitEditor: (habitId: string) => void
  resetHabitEditor: () => void
  deleteHabit: (habitId: string) => void
  // react router
  match: any
  location: any
  history: any
}

class UpdateHabit extends Component<PropTypes> {
  componentDidMount() {
    // load habit to state
    let id = this.props.match.params.id
    this.props.loadHabitEditor(id)
  }
  render() {
    const iconOptions = [
      '🍽',
      '🍸',
      '🎼',
      '💡',
      '📓',
      '📝',
      '🧼',
      '🧹',
      '🧺',
      '🛠',
      '🏋🏻‍♂️',
      '🍆🍑',
      '🎫',
      '🎮',
      '☎️',
      '💊',
      '🧽',
      '🪒',
      '🛍',
      '💈',
      '💸',
    ]
    return (
      <S.UpdateHabitContainer>
        <HabitEditor
          color={this.props.color}
          icon={this.props.icon}
          title={this.props.title}
          routine={this.props.routine}
          streak={this.props.streak}
          xp={this.props.xp}
          rp={this.props.rp}
          onNewHabitChange={this.props.onNewHabitChange}
          coolDownAmt={this.props.coolDownAmt}
          coolDownUnit={this.props.coolDownUnit}
          cue={this.props.cue}
          reward={this.props.reward}
          iconOptions={iconOptions}
        />
        <OutlinedButton
          onClick={(_) => {
            this.props.updateHabit(this.props.match.params.id)
            this.props.history.push('/')
          }}
        >
          Save Habit
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.resetHabitEditor()
            this.props.history.push('/')
          }}
        >
          Cancel
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.deleteHabit(this.props.match.params.id)
            this.props.history.push('/')
          }}
        >
          Delete Habit *dangerous
        </OutlinedButton>
      </S.UpdateHabitContainer>
    )
  }
}

interface StateType {
  [key: string]: any
}

const mapStateToProps = (state: StateType) => {
  return {
    color: state.firebase.newHabit.color,
    icon: state.firebase.newHabit.icon,
    title: state.firebase.newHabit.title,
    cue: state.firebase.newHabit.cue,
    routine: state.firebase.newHabit.routine,
    reward: state.firebase.newHabit.reward,
    streak: state.firebase.newHabit.streak,
    coolDownAmt: state.firebase.newHabit.coolDownAmt,
    coolDownUnit: state.firebase.newHabit.coolDownUnit,
    xp: state.firebase.newHabit.xp,
    rp: state.firebase.newHabit.rp,
  }
}

const mapDispatchToProps = {
  updateHabit,
  onNewHabitChange,
  loadHabitEditor,
  resetHabitEditor,
  deleteHabit,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateHabit))
