import ActionTypes from '../../utils/constants/actionTypes'

export function addHabit() {
  return (dispatch, getState, getFirebase) => {
    const habit = getState().firebase.newHabit
    console.log('adding habit:', habit)
    // make async call to db
    const db = getFirebase().firestore()
    db.collection('habits')
      .add({
        ...habit,
        color: {
          //TODO: fix color in NewHabit
          r: 255,
          g: 0,
          b: 0,
        },
        streakAmt: 0,
        lastEdit: new Date(), //TODO: make this firebase db timestamp
        createdAt: new Date(),
        createdBy: '',
        editedBy: [''],
        owner: '',
        routine: '',
        cue: '',
        next: '',
        version: {
          parent: '',
          children: [''],
        },
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

export function updateNewHabit(color, icon, title, description, streak, xp, rp, cooldownAmt, cooldownUnit) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_NEW_HABIT_PARAM,
      payload: { color, icon, title, description, streak, xp, rp, cooldownAmt, cooldownUnit },
    })
  }
}
