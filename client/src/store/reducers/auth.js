import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_SIGNUP_SUCCESS,
} from "../constants/auth";

const initialState = {
  user: {},
  error: "error",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case AUTH_LOGOUT_SUCCESS:
      return { ...state };
    case AUTH_SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default auth;
