import * as actionType from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
  updating: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        updating: {}
      };
    case actionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updating: {}
      };
    case actionType.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updating: {}
      };
    case actionType.DELETE_ERROR:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: action.payload.error,
        updating: {}
      };
    case actionType.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        updating: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
