import ActionTypes from '../../utils/constants/actionTypes'

const initialState = {
  habits: [],
  newHabit: {
    color: '#ff00ff',
    icon: '💡',
    title: 'Title',
    cue: '',
    routine: 'Describe your routine',
    reward: '',
    streak: 'week',
    coolDownAmt: 0,
    coolDownUnit: 'day',
    xp: 0,
    rp: 0,
  },
  sequences: [],
  newSequence: {
    title: 'Title',
    habits: [],
    coolDownAmt: 0,
    coolDownUnit: 'day',
  },
  userData: {},
}

interface Action {
  type: string
  payload: any
  err: Error
}

export default function firebase(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.BULK_ADD_HABITS:
      return state
    case ActionTypes.ADD_HABIT:
      return { ...state, newHabit: initialState.newHabit }
    case ActionTypes.ADD_HABIT_ERR:
      console.log(action.err)
      return state
    case ActionTypes.GET_HABITS:
      return { ...state, habits: action.payload }
    case ActionTypes.GET_HABITS_ERR:
      console.log(action.err)
      return state
    case ActionTypes.ON_NEW_HABIT_CHANGE:
      return {
        ...state,
        newHabit: {
          color: action.payload.color || state.newHabit.color,
          icon: action.payload.icon || state.newHabit.icon,
          title: action.payload.title || state.newHabit.title,
          cue: action.payload.cue || state.newHabit.cue,
          routine: action.payload.routine || state.newHabit.routine,
          reward: action.payload.reward || state.newHabit.reward,
          coolDownAmt: (action.payload.coolDownAmt <= 0 ? 0 : action.payload.coolDownAmt) || state.newHabit.coolDownAmt,
          coolDownUnit: action.payload.coolDownUnit || state.newHabit.coolDownUnit,
          xp: (action.payload.xp <= 0 ? 0 : action.payload.xp) || state.newHabit.xp,
          rp: (action.payload.rp <= 0 ? 0 : action.payload.rp) || state.newHabit.rp,
        },
      }
    case ActionTypes.DELETE_HABIT:
      return { ...state, newHabit: initialState.newHabit }
    case ActionTypes.DELETE_HABIT_ERR:
      console.log(action.err)
      return state
    case ActionTypes.UPDATE_HABIT:
      return { ...state, newHabit: initialState.newHabit }
    case ActionTypes.UPDATE_HABIT_ERR:
      console.log(action.err)
      return state
    case ActionTypes.LOAD_HABIT_EDITOR:
      return {
        ...state,
        newHabit: { ...action.payload.data() },
      }
    case ActionTypes.RESET_HABIT_EDITOR:
      return { ...state, newHabit: initialState.newHabit }
    // Sequences
    case ActionTypes.GET_SEQUENCES:
      return { ...state, sequences: action.payload }
    case ActionTypes.GET_SEQUENCES_ERR:
      console.log(action.err)
      return state
    case ActionTypes.UPDATE_SEQUENCE:
      return { ...state, newSequence: initialState.newSequence }
    case ActionTypes.UPDATE_SEQUENCE_ERR:
      console.log(action.err)
      return state
    case ActionTypes.DELETE_SEQUENCE:
      return { ...state, newSequence: initialState.newSequence }
    case ActionTypes.DELETE_SEQUENCE_ERR:
      console.log(action.err)
      return state
    case ActionTypes.ADD_SEQUENCE:
      return { ...state, newSequence: initialState.newSequence }
    case ActionTypes.ADD_SEQUENCE_ERR:
      console.log(action.err)
      return state
    case ActionTypes.BULK_ADD_SEQUENCES:
      return state
    case ActionTypes.BULK_ADD_SEQUENCES_ERR:
      console.log(action.err)
      return state
    case ActionTypes.ON_NEW_SEQUENCE_CHANGE:
      return {
        ...state,
        newSequence: {
          title: action.payload.title || state.newSequence.title,
          coolDownAmt:
            (action.payload.coolDownAmt <= 0 ? 0 : action.payload.coolDownAmt) || state.newSequence.coolDownAmt,
          coolDownUnit: action.payload.coolDownUnit || state.newSequence.coolDownUnit,
          habits: action.payload.habits || state.newSequence.habits,
        },
      }
    case ActionTypes.LOAD_SEQUENCE_EDITOR:
      const sequence = action.payload.data() // get data from firstore doc
      const _loadedHabits = state.habits.filter((habit: any) => sequence.habits.includes(habit.id)) // load in habit data of habits in sequence
      return { ...state, newSequence: { ...sequence, habits: _loadedHabits } } // return sequnce with loaded habits instead of habit ids
    case ActionTypes.RESET_SEQUENCE_EDITOR:
      return { ...state, newSequence: initialState.newSequence }
    case ActionTypes.GET_USER_STATS:
      return { ...state, userData: action.payload }
    case ActionTypes.GET_USER_STATS_ERR:
      console.log(action.err)
      return state
    case ActionTypes.DELETE_USER:
      return { ...state, userData: {} }
    case ActionTypes.DELETE_USER_ERR:
      return state
    default:
      return state
  }
}
