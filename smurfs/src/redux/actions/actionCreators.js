import axios from "axios";
import * as actionType from "./actionTypes";

const apiEndpoint = "http://localhost:3333/smurfs";

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
      const { data: users } = await axios.get(apiEndpoint);

      dispatch(fetchSuccess(users));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const postData = payload => {
  return async dispatch => {
    // GET DATA OBJECT YOU ARE POSTING
    const obj = payload;

    try {
      // MAKE POST REQUEST
      const { data: users } = await axios.post(apiEndpoint, obj);

      // ADD POST DATA TO CLIENT STATE
      const data = [...users];
      dispatch(fetchSuccess(data));
    } catch (error) {
      // DISPATCH ERROR MESSAGE
      dispatch(fetchError(error));
    }
  };
};

export const deleteError = (data, error) => {
  return {
    type: actionType.DELETE_ERROR,
    payload: { data, error: error.message }
  };
};

export const deleteData = id => {
  return async (dispatch, getState) => {
    dispatch(fetchRequest());
    // store current state in previousSmurfs
    const previousSmurfs = getState().data;

    // optimistically, update on client side
    const smurfs = [...getState().data].filter(smurf => smurf.id !== id);
    dispatch(fetchSuccess(smurfs));

    // server side update. if any fail, rollback the state with previousSmurfs
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
    } catch (error) {
      dispatch(deleteError(previousSmurfs, error.message));
    }
  };
};

export const updateRequest = data => {
  return {
    type: actionType.UPDATE_REQUEST,
    payload: data
  };
};

export const updateData = (oldUser, user) => {
  return async dispatch => {
    // DATA OBJ BEING USED TO UPDATE

    try {
      const { data: users } = await axios.put(
        `${apiEndpoint}/${oldUser.id}`,
        user
      );
      dispatch(fetchSuccess(users));
    } catch (error) {
      dispatch(fetchError(error.message));
    }

    // UPDATE SERVER WITH PUT REQUEST

    // UPDATE CLIENT
    // 1. make copy of specific user

    // 2. Find index of specific user in array

    // 3. use specific user and index and make it equal new data

    // 4. update state with new user data
  };
};
