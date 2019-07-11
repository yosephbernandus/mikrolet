import axios from "axios";
import {
  ADD_DRIVER_LOCATION,
  GET_ERRORS,
  GET_DRIVER_LOCATION,
  GET_DRIVER,
  GET_USERS
} from "./types";

// // Get Location
// export const getLocation = location => {
//   return {
//     type: GET_LOCATION,
//     payload: location
//   };
// };

// ADD DRIVER LOCATION
export const addDriverLocation = postData => dispatch => {
  axios
    .post("/api/location/driverLocation", postData)
    .then(res =>
      dispatch({
        type: ADD_DRIVER_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET POSTS DRIVER
export const getDrivers = () => dispatch => {
  axios
    .get("/api/location")
    .then(res =>
      dispatch({
        type: GET_DRIVER_LOCATION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_DRIVER_LOCATION,
        payload: null
      });
    });
};

// GET POSTS User
export const getUsers = () => dispatch => {
  axios
    .get("/api/location/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_USERS,
        payload: null
      });
    });
};

export const getDriver = userId => dispatch => {
  axios
    .get(`api/location/driver/${userId}`)
    .then(res =>
      dispatch({
        type: GET_DRIVER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DRIVER,
        payload: null
      })
    );
};
