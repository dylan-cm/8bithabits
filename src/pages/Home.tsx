import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { firestoreConnect } from 'react-redux-firebase'

import HabitCard from '../molecules/HabitCard'

import { getHabits, bulkAddHabits, deleteHabit } from '../redux/actions/firebaseActions.js'
import exampleHabits from '../utils/constants/exampleHabits.json'

const S: Styles.Component = Styles
S.HomeContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};
  margin: 0 16px;
  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {
  habits: [any]
  getHabits: () => void
  bulkAddHabits: (habits: any) => void
  deleteHabit: (habitId: string) => void
}

class Home extends Component<PropTypes> {
  componentDidMount() {
    this.props.getHabits()
    if (false) this.props.bulkAddHabits(exampleHabits) //! For testing purposes only, false means innactive
  }
  render() {
    const { habits } = this.props

    return (
      <S.HomeContainer>
        {habits.length < 1 ? (
          <div>Loading Habits...</div>
        ) : (
          habits.map((habit: any) => {
            return (
              <HabitCard
                key={habit.id}
                icon={habit.icon}
                title={habit.title}
                description={habit.description}
                color={{ r: habit.color.r, g: habit.color.g, b: habit.color.b }}
                xp={habit.xp}
                rp={habit.rp}
                coolDownAmt={habit.coolDownAmt}
                streakAmt={habit.streakAmt}
                complete={false}
                onEdit={() => this.props.deleteHabit(habit.id)}
                onToggleCheck={() => console.log('Toggle check')}
              />
            )
          })
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
  }
}

const mapDispatchToProps = {
  getHabits,
  bulkAddHabits,
  deleteHabit,
}

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'habits' }]),
)(Home)
