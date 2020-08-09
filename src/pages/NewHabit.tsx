/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from '../styles/styled'
import * as Styles from '../styles'
import OutlinedButton from '../atoms/OutlinedButton'

import { addHabit, updateNewHabit } from '../redux/actions/firebaseActions.js'
import HabitCard from '../molecules/HabitCard'

const S: Styles.Component = Styles
S.NewHabitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;

  min-height: 100vh;
  width: 100vw;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};

  color: ${(props) => props.theme.color.positive};

  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border: solid slategrey 10px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
  }

  .number-input {
    width: 4rem;
  }

  input,
  textarea {
    margin: 5px;
  }

  .empty-space {
    width: 5.1rem;
  }
`

interface PropTypes {
  color: string
  icon: string
  title: string
  description: string
  streak: 'year' | 'month' | 'week' | 'day'
  xp: number
  rp: number
  cooldownAmt: number
  cooldownUnit: 'year' | 'month' | 'week' | 'day'
  updateNewHabit: (
    color?: string,
    icon?: string,
    title?: string,
    description?: string,
    streak?: string,
    xp?: number,
    rp?: number,
    cooldownAmt?: number,
    cooldownUnit?: string,
  ) => void
  addHabit: () => void
}

class NewHabit extends Component<PropTypes> {
  render() {
    const {
      color,
      icon,
      title,
      description,
      streak,
      xp,
      rp,
      updateNewHabit,
      addHabit,
      cooldownAmt,
      cooldownUnit,
    } = this.props
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
        <HabitCard
          plain
          color={{ r: 255, g: 0, b: 0 }}
          icon={icon}
          title={title}
          description={description}
          streakUnit={streak}
          streakAmt={0}
          coolDownAmt={cooldownAmt}
          coolDownUnit={cooldownUnit}
          xp={xp}
          rp={rp}
        />
        <div className="right">
          <div className="row">
            <select
              id="select-color"
              value={color}
              onChange={(_e) =>
                updateNewHabit(
                  _e.target.value,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                )
              }
            >
              <option value="#ff0000">Red</option>
              <option value="#00ff00">Green</option>
              <option value="#0000ff">Red</option>
              <option value="#ffff00">Yellow</option>
              <option value="#00ffff">Cyan</option>
              <option value="#ff00ff">Magenta</option>
              <option value="#ffa500">Orange</option>
              <option value="#663399">Purple</option>
            </select>
            <select
              id="select-icon"
              value={icon}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  _e.target.value,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                )
              }
            >
              {iconOptions.map((iconOption) => (
                <option key={iconOption} value={iconOption}>
                  {iconOption}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(_e) =>
              updateNewHabit(
                undefined,
                undefined,
                _e.target.value,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
              )
            }
          />
          <textarea
            cols={40}
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(_e) =>
              updateNewHabit(
                undefined,
                undefined,
                undefined,
                _e.target.value,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
              )
            }
          />
          <div className="row">
            <span>📅</span>
            <div className="empty-space"></div>
            <select
              value={streak}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  _e.target.value,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                )
              }
            >
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="anually">anually</option>
            </select>
            <span>⚡</span>
            <input
              className="number-input"
              type="number"
              placeholder="XP"
              value={xp}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  Number(_e.target.value),
                  undefined,
                  undefined,
                  undefined,
                )
              }
            />
          </div>
          <div className="row">
            <span>⏳</span>
            <input
              type="number"
              className="number-input"
              value={cooldownAmt}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  Number(_e.target.value),
                  undefined,
                )
              }
            ></input>
            <select
              value={cooldownUnit}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  _e.target.value,
                )
              }
            >
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="anually">anually</option>
            </select>
            <span>💎</span>
            <input
              className="number-input"
              type="number"
              placeholder="RP"
              value={rp}
              onChange={(_e) =>
                updateNewHabit(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  Number(_e.target.value),
                  undefined,
                  undefined,
                )
              }
            />
          </div>
          <OutlinedButton onClick={addHabit}>Save New Habit</OutlinedButton>
        </div>
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
    description: state.firebase.newHabit.description,
    streak: state.firebase.newHabit.streak,
    cooldownAmt: state.firebase.newHabit.cooldownAmt,
    cooldownUnit: state.firebase.newHabit.cooldownUnit,
    xp: state.firebase.newHabit.xp,
    rp: state.firebase.newHabit.rp,
  }
}

const mapDispatchToProps = {
  addHabit,
  updateNewHabit,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHabit)
