import React, { FC } from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'

const S: Styles.Component = Styles
S.HabitCard = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 200px;
  height: 300px;
  padding: 8px 4px;
  box-sizing: border-box;

  background: rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 0.05);
  border: 1px solid rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }

  h1 {
    font-weight: 400;
    font-size: 4rem;
    text-shadow: 0px 0px 30px rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
  }
  h2 {
    font-weight: 600;
    font-size: 3rem;
    text-shadow: 0px 0px 30px rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
    color: rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
  }
  h3 {
    font-weight: 600;
    font-size: 2rem;
    text-shadow: 0px 0px 30px rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
    color: rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
  }
  h4 {
    font-weight: 200;
    font-size: 1.5rem;
  }
  p {
    text-align: center;
    font-weight: 400;
    font-size: 0.75rem;
    max-lines: 4;
  }
  p.description {
    height: 56px;
  }
  div.burst {
    background: rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 0.1);
    border: 1px solid rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 1);
    border-radius: 100px;
    width: 84px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 20px rgba(${({ r, g, b }) => (r | 0) + ',' + (g | 0) + ',' + (b | 0)}, 0.5);
  }
  div.rewards {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
  }
  div.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
  .btn {
    cursor: pointer;
  }
`

const HabitCard: FC<HabitCardProps> = ({
  streakUnit = 'week',
  streakAmt = 0,
  coolDownUnit = 'day',
  coolDownAmt = 1,
  xp = 0,
  rp = 0,
  plain = false,
  ...props
}) => {
  return (
    <S.HabitCard r={props.color.r} g={props.color.g} b={props.color.b}>
      <div className="row">
        {plain ? (
          <></>
        ) : (
          <>
            <div
              onClick={(_) => {
                if (props.onEdit) props.onEdit()
              }}
              className="btn"
            >
              <span role="img" aria-label="edit icon">
                ✏️
              </span>
            </div>
            <div onClick={props.onToggleCheck} className="btn">
              <span role="img" aria-label="complete icon">
                {props.complete ? '✅' : '🟩'}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="burst">
        <h1>
          <span role="img" aria-label="scale icon">
            {props.icon}
          </span>
        </h1>
      </div>
      {props.title.length < 7 ? <h2>{props.title}</h2> : <h3>{props.title}</h3>}
      <p className="description">{props.description}</p>
      <div className="rewards">
        <div className="row">
          <h4>
            <span role="img" aria-label="cal icon">
              📆
            </span>
            {streakAmt + streakUnit[0]}
          </h4>
          <h4>
            {xp}
            <span role="img" aria-label="cal icon">
              ⚡️
            </span>
          </h4>
        </div>
        <div className="row">
          <h4>
            <span role="img" aria-label="cal icon">
              ⏳
            </span>
            {coolDownAmt + coolDownUnit[0]}
          </h4>
          <h4>
            {rp}
            <span role="img" aria-label="cal icon">
              💎
            </span>
          </h4>
        </div>
      </div>
    </S.HabitCard>
  )
}

interface HabitCardProps {
  xp: number
  rp: number
  streakUnit?: 'year' | 'month' | 'week' | 'day'
  streakAmt?: number
  coolDownUnit?: 'year' | 'month' | 'week' | 'day'
  coolDownAmt?: number
  description?: string
  title: string
  color: {
    r: number
    g: number
    b: number
  }
  icon: string //TODO: extend options for emoji slection by using type aliasing
  complete?: boolean
  onEdit?: () => void
  onToggleCheck?: () => void
  plain?: boolean
}

export default HabitCard
