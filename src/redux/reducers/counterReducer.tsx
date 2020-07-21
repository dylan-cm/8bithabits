import ActionTypes from "../../utils/constants/actionTypes";

const initialState = 1;

interface Action {
  type: string;
  payload: any;
}

export default function counter(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.INCREMENT_COUNTER:
      return state + 1;
    case ActionTypes.DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
