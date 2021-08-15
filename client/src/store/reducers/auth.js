import {
  AUTH_GET_USER_ERROR,
  AUTH_GET_USER_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_RESET,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_SUCCESS,
} from "../constants/auth";

const initialState = {
  user: {},
  error: "",
  loading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: "", loading: false };
    case AUTH_LOGIN_LOADING:
      return { ...state, user: {}, error: "", loading: true };
    case AUTH_LOGIN_ERROR:
      return { ...state, user: {}, error: action.payload, loading: false };
    case AUTH_LOGOUT_SUCCESS:
      return { ...state, error: "", loading: false, user: action.payload };
    case AUTH_SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    case AUTH_SIGNUP_ERROR:
      return { ...state, user: {}, loading: false, error: action.payload };
    case AUTH_RESET:
      return { ...state, user: {}, loading: false, error: "" };
    case AUTH_GET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: "" };
    case AUTH_GET_USER_ERROR:
      return { ...state, user: {}, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default auth;
