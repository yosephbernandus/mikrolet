import { socket } from "../App";

const initialState = {
  pot: 0,
  snackbarIsOpen: false,
  name: null,
  names: [],
  mode: null,
  whoDidIt: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SEND_LOCATION":
      // put the assigned client's username to the pot
      state = { ...state, location: action.location };
      break;
    default:
      break;
  }
  return state;
}
