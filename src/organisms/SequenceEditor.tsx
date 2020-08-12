import React, { FC } from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'
// import Sequence from '../molecules/Sequence'

const S: Styles.Component = Styles
S.SequenceEditor = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const SequenceEditor: FC<SequenceEditorProps> = (props) => {
  var habitList: any[] = []
  return (
    <S.SequenceEditor>
      <h1>{props.title}</h1>
      {props.habits.map((habit) => (
        <p key={habit.id + 'label'}>
          <input
            key={habit.id + 'checkbox'}
            type="checkbox"
            value={habit.id}
            onChange={(_e) => {
              const selectedHabit = _e.target.value
              // if the checkbox is checked
              if (_e.target.checked === true) {
                // if the habit is not yet in the list
                if (!habitList.includes(selectedHabit)) {
                  // add the habit to the sequence list
                  habitList.push(selectedHabit)
                }
              } // remove the habit from the sequence list
              else habitList = habitList.filter((entry) => entry !== selectedHabit)
              // save sequence list to new sequence state
              props.onNewSequenceChange(undefined, undefined, undefined, habitList)
            }}
          />
          {habit.title}
        </p>
      ))}
      <div>
        <input
          value={props.title}
          onChange={(_e) => props.onNewSequenceChange(_e.target.value, undefined, undefined)}
        />
      </div>
    </S.SequenceEditor>
  )
}

interface SequenceEditorProps {
  title: string
  habits: any[]
  onNewSequenceChange: (title?: string, coolDownAmt?: number, coolDownUnit?: string, habitList?: any[]) => void
}

export default SequenceEditor
