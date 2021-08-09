import api from "../../utils/api";
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_SUCCESS,
} from "../constants/auth";

export const login = (user) => async (dispatch) => {
  try {
    const response = await api.post("/login", user);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.user });
  } catch (err) {
    dispatch({ type: AUTH_LOGIN_ERROR });
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    const response = await api.post("/signup", user);
    dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: AUTH_SIGNUP_ERROR, payload: err.message });
  }
};
