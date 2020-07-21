const initialState = {}

interface Action {
  type: string
  payload: any
  err: Error
}

export default (state = initialState, action: Action) => {
  return { state, action }
}
