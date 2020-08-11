import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { firestoreConnect } from 'react-redux-firebase'

import HabitCard from '../molecules/HabitCard'

import {
  getHabits,
  bulkAddHabits,
  deleteHabit,
  getSequences,
  bulkAddSequences,
} from '../redux/actions/firebaseActions.js'
import exampleHabits from '../utils/constants/exampleHabits.json'
import exampleSequences from '../utils/constants/exampleSequences.json'
import { withRouter } from 'react-router-dom'
import Sequence from '../molecules/Sequence'

const S: Styles.Component = Styles
S.HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  min-height: 100vh;
  width: 100vw;

  padding: 0 100px;
  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};
  box-sizing: border-box;
  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {
  // Habits
  habits: any[]
  getHabits: () => void
  bulkAddHabits: (habits: any[]) => void
  deleteHabit: (habitId: string) => void
  // Sequences
  sequences: any[]
  getSequences: () => void
  bulkAddSequences: (sequences: any[]) => void
  // React Router
  history: any
  match: any
  location: any
}

class Home extends Component<PropTypes> {
  componentDidMount() {
    this.props.getHabits()
    this.props.getSequences()
    if (false) this.props.bulkAddHabits(exampleHabits) //! For testing purposes only, false means innactive
    if (false) this.props.bulkAddSequences(exampleSequences) //! For testing purposes only, false means innactive
  }
  render() {
    const { habits, sequences } = this.props
    return (
      <S.HomeContainer>
        {sequences.length < 1 && habits.length < 1 ? (
          <div>Loading Sequences...</div>
        ) : (
          sequences.map((sequence) => (
            <Sequence
              key={sequence.id}
              onHabitEdit={(habitId: string) => this.props.history.push('/edit/' + habitId)}
              title={sequence.title}
              habits={habits.filter((habit) => sequence.habits.includes(habit.id))}
              onSequenceEdit={() => console.log('edit sequence ', sequence.id)}
            />
          ))
        )}
        {habits.length < 1 ? (
          <div>Loading Habits...</div>
        ) : (
          habits.map((habit: any) => (
            <HabitCard
              key={habit.id}
              icon={habit.icon}
              title={habit.title}
              cue={habit.cue}
              routine={habit.routine}
              reward={habit.reward}
              color={{ r: habit.color.r, g: habit.color.g, b: habit.color.b }}
              xp={habit.xp}
              rp={habit.rp}
              coolDownAmt={habit.coolDownAmt}
              streakAmt={habit.streakAmt}
              complete={false}
              onEdit={() => this.props.history.push('/edit/' + habit.id)}
              onToggleCheck={() => console.log('Toggle check')}
            />
          ))
        )}
      </S.HomeContainer>
    )
  }
}

interface StateType {
  [key: string]: any
  firebase: any
}

const mapStateToProps = (state: StateType) => {
  return {
    habits: state.firebase.habits,
    sequences: state.firebase.sequences,
  }
}

const mapDispatchToProps = {
  getHabits,
  bulkAddHabits,
  deleteHabit,
  getSequences,
  bulkAddSequences,
}

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'habits' }]),
)(withRouter(Home))
