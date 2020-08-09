import ActionTypes from '../../utils/constants/actionTypes'

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  )
}

export function addHabit() {
  return (dispatch, getState, getFirebase) => {
    const habit = getState().firebase.newHabit
    // generate id
    const habitId = habit.title + '-' + uuidv4()
    // make async call to db
    const db = getFirebase().firestore()
    db.collection('habits')
      .doc(habitId)
      .set({
        ...habit,
        id: habitId,
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
        sequence: '',
        previous: '',
        next: '',
        version: {
          parent: '',
          children: [''],
        },
      })
      .then((data) => {
        dispatch({ type: ActionTypes.ADD_HABIT, payload: habit })
        dispatch(getHabits())
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
        // habits.forEach((doc) => console.log(doc.id, doc.data()))
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
      // generate id
      const habitId = habit.title + '-' + uuidv4()
      db.collection('habits')
        .doc(habitId)
        .set({
          ...habit,
          id: habitId,
          lastEdit: new Date(), //TODO: make this firebase db timestamp
          createdAt: new Date(),
        })
        .then((_data) => {
          dispatch({ type: ActionTypes.BULK_ADD_HABITS })
          dispatch(getHabits())
        })
        .catch((err) => dispatch({ type: ActionTypes.ADD_HABIT_ERR, err }))
    })
  }
}

export function updateNewHabit(color, icon, title, cue, routine, reward, streak, xp, rp, cooldownAmt, cooldownUnit) {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.UPDATE_NEW_HABIT_PARAM,
      payload: { color, icon, title, cue, routine, reward, streak, xp, rp, cooldownAmt, cooldownUnit },
    })
}

export function deleteHabit(habitId) {
  return (dispatch, getState, getFirebase) => {
    const db = getFirebase().firestore() // initialize db
    db.collection('habits') // select habits collection
      .doc(habitId) //select habit
      .delete() // async call to delete habit
      .then((_data) => {
        dispatch({ type: ActionTypes.DELETE_HABIT })
        dispatch(getHabits())
      }) // then dispatch the action and reload from db
      .catch((err) => dispatch({ type: ActionTypes.DELETE_HABIT_ERR, err: err })) // or catch the error
  }
}
