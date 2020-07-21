import ActionTypes from "../../utils/constants/actionTypes";
import store from "../store";

export function incrementIfOdd() {
  const { counter } = store.getState();
  if (counter % 2 === 0) return;
  store.dispatch({ type: ActionTypes.INCREMENT_COUNTER });
}

export function increment() {
  store.dispatch({ type: ActionTypes.INCREMENT_COUNTER });
}

export function decrement() {
  store.dispatch({ type: ActionTypes.DECREMENT_COUNTER });
}
