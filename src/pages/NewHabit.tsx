import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { addHabit, onNewHabitChange, resetHabitEditor } from '../redux/actions/firebaseActions.js'
import HabitEditor from '../organisms/HabitEditor'
import OutlinedButton from '../atoms/OutlinedButton'

const S: Styles.Component = Styles
S.NewHabitContainer = styled.div`
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
  addHabit: () => void
  resetHabitEditor: () => void
  // withRouter props
  match: any
  history: any
  location: any
}

class NewHabit extends Component<PropTypes> {
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
      <S.NewHabitContainer>
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
            this.props.addHabit()
            this.props.resetHabitEditor()
            this.props.history.push('/')
          }}
        >
          Save New Habit
        </OutlinedButton>
        <OutlinedButton
          onClick={(_) => {
            this.props.resetHabitEditor()
            this.props.history.push('/')
          }}
        >
          Cancel
        </OutlinedButton>
      </S.NewHabitContainer>
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
  addHabit,
  onNewHabitChange,
  resetHabitEditor,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHabit)
