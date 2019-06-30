import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register Driver
export const registerDriver = (driverData, history) => dispatch => {
  axios
    .post("/api/drivers/register", driverData)
    .then(res => history.push("/logindriver"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get Driver Token
export const loginDriver = driverData => dispatch => {
  axios
    .post("/api/drivers/login", driverData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get driver data
      const decoded = jwt_decode(token);
      // Set current driver
      dispatch(setCurrentDriver(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in driver
export const setCurrentDriver = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log driver out
export const logoutDriver = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current driver to {} which will set isAuthenticated to false
  dispatch(setCurrentDriver({}));
};
