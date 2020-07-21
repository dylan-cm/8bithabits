import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { firestoreConnect } from 'react-redux-firebase'

import HabitCard from '../molecules/HabitCard'

import { addHabit, getHabits, bulkAddHabits } from '../redux/actions/firebaseActions.js'
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
  addHabit: (habit: { [key: string]: any }) => void
  getHabits: () => void
  bulkAddHabits: (habits: any) => void
}

class Home extends Component<PropTypes> {
  componentDidMount() {
    this.props.getHabits()
    if (false) this.props.bulkAddHabits(exampleHabits) //! For testing purposes only
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
                key={habit.title}
                icon={habit.icon}
                title={habit.title}
                description={habit.description}
                color={{ r: habit.color.r, g: habit.color.g, b: habit.color.b }}
                xp={habit.xp}
                rp={habit.rp}
                coolDownAmt={habit.coolDownAmt}
                streakAmt={habit.streakAmt}
                complete={false}
                onEdit={() => console.log('Edit')}
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
  addHabit,
  getHabits,
  bulkAddHabits,
}

const thing: any = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'habits' }]),
)(Home)
export default thing
