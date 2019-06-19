import { GET_LOCATION } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  location: {
    latitude: 0,
    longitude: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
}
