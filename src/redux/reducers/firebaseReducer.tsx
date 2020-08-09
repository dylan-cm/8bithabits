import ActionTypes from '../../utils/constants/actionTypes'
// import { FirebaseReducer } from 'react-redux-firebase'
// // Optional: If you use the user profile option
// interface Profile {
//   name: string
//   email: string
// }

// // If you have a todos collection, you might have this type
// interface Todo {
//   text: string
//   completed: boolean
// }

// // Optional: You can define the schema of your Firebase Redux store.
// // This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
// interface Schema {
//   todos: Todo
// }

// // with both reducer types
// interface RootState {
//   firebase: FirebaseReducer.Reducer<Profile, Schema>
// }

const initialState = {
  habits: [],
  newHabit: {
    color: '#ff00ff',
    icon: '💡',
    title: 'Title',
    description: 'Describe your routine',
    streak: 'week',
    cooldownAmt: 0,
    cooldownUnit: 'day',
    xp: 0,
    rp: 0,
  },
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
      return state
    case ActionTypes.ADD_HABIT_ERR:
      console.log(action.err)
      return state
    case ActionTypes.GET_HABITS:
      var loadedHabits: any = []
      action.payload.forEach((doc: any) => loadedHabits.push(doc.data()))
      console.log(loadedHabits)
      return { ...state, habits: loadedHabits }
    case ActionTypes.GET_HABITS_ERR:
      console.log(action.err)
      return state
    case ActionTypes.UPDATE_NEW_HABIT_PARAM:
      return {
        ...state,
        newHabit: {
          color: action.payload.color || state.newHabit.color,
          icon: action.payload.icon || state.newHabit.icon,
          title: action.payload.title || state.newHabit.title,
          description: action.payload.description || state.newHabit.description,
          streak: action.payload.streak || state.newHabit.streak,
          cooldownAmt: (action.payload.cooldownAmt <= 0 ? 0 : action.payload.cooldownAmt) || state.newHabit.cooldownAmt,
          cooldownUnit: action.payload.cooldownUnit || state.newHabit.cooldownUnit,
          xp: (action.payload.xp <= 0 ? 0 : action.payload.xp) || state.newHabit.xp,
          rp: (action.payload.rp <= 0 ? 0 : action.payload.rp) || state.newHabit.rp,
        },
      }
    case ActionTypes.DELETE_HABIT:
      return state
    case ActionTypes.DELETE_HABIT_ERR:
      console.log(action.err)
      return state
    default:
      return state
  }
}
