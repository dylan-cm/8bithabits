/* eslint-disable jsx-a11y/accessible-emoji */
import React, { FC } from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
import HabitCard from '../molecules/HabitCard'

const S: Styles.Component = Styles
S.HabitEditor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;

  padding-top: ${(props) => props.theme.layout.headerHeightDesktop};
  padding-bottom: 24px;

  width: 100%;

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

interface HabitEditorProps {
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
  iconOptions: string[]
}

const HabitEditor: FC<HabitEditorProps> = ({ ...props }) => {
  const {
    color,
    icon,
    title,
    routine,
    streak,
    xp,
    rp,
    onNewHabitChange,
    coolDownAmt,
    coolDownUnit,
    cue,
    reward,
    iconOptions,
  } = props
  return (
    <S.HabitEditor>
      <HabitCard
        plain
        color={{ r: 255, g: 0, b: 0 }}
        icon={icon}
        title={title}
        cue={cue}
        routine={routine}
        reward={reward}
        streakUnit={streak}
        streakAmt={0}
        coolDownAmt={coolDownAmt}
        coolDownUnit={coolDownUnit}
        xp={xp}
        rp={rp}
      />
      <div className="right">
        <div className="row">
          <select
            id="select-color"
            value={color}
            onChange={(_e) =>
              onNewHabitChange(
                _e.target.value,
                undefined,
                undefined,
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
              onNewHabitChange(
                undefined,
                _e.target.value,
                undefined,
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
            onNewHabitChange(
              undefined,
              undefined,
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
        />
        <input
          type="text"
          placeholder="Cue"
          value={cue}
          onChange={(_e) =>
            onNewHabitChange(
              undefined,
              undefined,
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
        />
        <textarea
          cols={40}
          rows={4}
          placeholder="Routine"
          value={routine}
          onChange={(_e) =>
            onNewHabitChange(
              undefined,
              undefined,
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
        <input
          type="text"
          placeholder="Reward"
          value={reward}
          onChange={(_e) =>
            onNewHabitChange(
              undefined,
              undefined,
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
              onNewHabitChange(
                undefined,
                undefined,
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
              onNewHabitChange(
                undefined,
                undefined,
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
            value={coolDownAmt}
            onChange={(_e) =>
              onNewHabitChange(
                undefined,
                undefined,
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
          />
          <select
            value={coolDownUnit}
            onChange={(_e) =>
              onNewHabitChange(
                undefined,
                undefined,
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
              onNewHabitChange(
                undefined,
                undefined,
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
      </div>
    </S.HabitEditor>
  )
}

export default HabitEditor
