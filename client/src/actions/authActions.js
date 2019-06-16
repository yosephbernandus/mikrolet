import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";

// Register User
export const registerDriver = (driverData, history) => dispatch => {
  axios
    .post("api/driver/register", driverData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};