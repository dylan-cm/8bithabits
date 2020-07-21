import ActionTypes from '../../utils/constants/actionTypes'

export function addHabit(habit) {
  return (dispatch, getState, getFirebase) => {
    // make async call to db
    const db = getFirebase().firestore()
    db.collection('habits')
      .add({
        ...habit,
        lastEdit: new Date(), //TODO: make this firebase db timestamp
      })
      .then((data) => {
        dispatch({ type: ActionTypes.ADD_HABIT, payload: habit })
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.ADD_HABIT_ERR, err })
      })
  }
}

export function getHabits() {
  return (dispatch, getState, getFirebase) => {
    // make async call to db
    const db = getFirebase().firestore()
    db.collection('habits')
      .get()
      .then((habits) => {
        // data.forEach((doc) => console.log(doc.id, doc.data()))
        dispatch({ type: ActionTypes.GET_HABITS, payload: habits })
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.GET_HABITS_ERR, err })
      })
  }
}

export function bulkAddHabits(habits) {
  return (dispatch, getState, getFirebase) => {
    // make async call to db
    const db = getFirebase().firestore()
    habits.forEach((habit) => {
      db.collection('habits')
        .add({
          ...habit,
          lastEdit: new Date(), //TODO: make this firebase db timestamp
          createdAt: new Date(),
        })
        .then((data) => {
          dispatch({ type: ActionTypes.BULK_ADD_HABITS, payload: habits })
          getHabits()
        })
        .catch((err) => {
          dispatch({ type: ActionTypes.ADD_HABIT_ERR, err })
        })
    })
  }
}
