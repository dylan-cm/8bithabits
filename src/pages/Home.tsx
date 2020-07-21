import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import { firestoreConnect } from 'react-redux-firebase'

import HabitCard from '../molecules/HabitCard'

import { addHabit, getHabits } from '../redux/actions/firebaseActions.js'

const S: Styles.Component = Styles
S.HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};

  color: ${(props) => props.theme.color.positive};
`

interface PropTypes {
  habits: [any]
  addHabit: (habit: { [key: string]: any }) => void
  getHabits: () => void
}

class Home extends Component<PropTypes> {
  componentDidMount() {
    this.props.getHabits()
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
}

const thing: any = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'habits' }]),
)(Home)
export default thing
