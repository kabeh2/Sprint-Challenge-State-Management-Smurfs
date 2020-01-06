import axios from "axios";
import * as actionType from "./actionTypes";

export const fetchRequest = () => {
  return {
    type: actionType.FETCH_REQUEST
  };
};

export const fetchSuccess = data => {
  return {
    type: actionType.FETCH_SUCCESS,
    payload: data
  };
};

export const fetchError = error => {
  return {
    type: actionType.FETCH_ERROR,
    payload: error
  };
};

export const fetchData = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const { data: users } = await axios.get("http://localhost:3333/smurfs");

      dispatch(fetchSuccess(users));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};
