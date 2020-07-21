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
}

interface Action {
  type: string
  payload: any
  err: Error
}

export default function firebase(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_HABIT:
      console.log('added habit:', action.payload)
      return { ...state }
    case ActionTypes.ADD_HABIT_ERR:
      console.log(action.err)
      return state
    case ActionTypes.GET_HABITS:
      var loadedHabits: any = []
      action.payload.forEach((doc: any) => loadedHabits.push(doc.data()))
      return { ...state, habits: loadedHabits }
    case ActionTypes.GET_HABITS_ERR:
      console.log(action.err)
      return state
    default:
      return state
  }
}
