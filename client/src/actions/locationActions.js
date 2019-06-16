import { GET_LOCATION } from "./types";

// Get Location
export const getLocation = location => {
  return {
    type: GET_LOCATION,
    payload: location
  };
};