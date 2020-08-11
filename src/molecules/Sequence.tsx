import React, { FC } from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
import HabitCard from './HabitCard'

const S: Styles.Component = Styles
S.Sequence = styled.div<any>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding: 24px;
  box-sizing: border-box;
  width: 100%;

  overflow: auto;
  /* white-space: nowrap; */

  background: #eee;
  border: solid #333 4px;
  border-radius: 10px;

  .habitWrapper {
    padding: 0 8px;
  }

  .pointer {
    margin: 0 4px;
    min-width: 24px;
    min-height: 24px;
    background: #555;
    border-radius: 24px;
  }

  .btn {
    cursor: pointer;
  }
`

const Sequence: FC<SequenceProps> = (props) => {
  return (
    <S.Sequence>
      <div className="row">
        {props.plain ? (
          <></>
        ) : (
          <>
            <div
              onClick={(_) => {
                if (props.onSequenceEdit) props.onSequenceEdit()
              }}
              className="btn"
            >
              <span role="img" aria-label="edit icon">
                ✏️
              </span>
            </div>
          </>
        )}
      </div>
      {props.habits.map((habit, i) => {
        return (
          <>
            <div className="habitWrapper" key={habit.id + props.title + 'wrap'}>
              <HabitCard
                key={habit.id + props.title}
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
                onEdit={() => props.onHabitEdit(habit.id)}
                onToggleCheck={() => console.log('Toggle check')}
              />
            </div>
            {/* If it's the last habit, don't render a pointer to the next habit */}
            <div className={i + 1 === props.habits.length ? '' : 'pointer'} />
          </>
        )
      })}
    </S.Sequence>
  )
}

interface SequenceProps {
  plain?: boolean
  habits: any[]
  title: string
  cooldownAmt?: number
  cooldownUnit?: string
  onHabitEdit: (habitId: string) => void
  onSequenceEdit?: () => void
}

export default Sequence
