import api from "../../utils/api";
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_LOADING,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_ERROR,
} from "../constants/auth";

export const login = (user) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    const response = await api.post("/login", user);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.user });
    localStorage.setItem("token", response.data.user._id);
  } catch (err) {
    dispatch({ type: AUTH_LOGIN_ERROR, payload: "Not Found Account..." });
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    const response = await api.post("/signup", user);
    dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: AUTH_SIGNUP_ERROR, payload: "The Account Exists..." });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGOUT_SUCCESS, payload: {} });
    localStorage.removeItem("token");
  } catch (err) {
    dispatch({ type: AUTH_LOGOUT_ERROR });
  }
};

export const getUser = () => async (dispatch) => {
  // when we get token from localstorage, it comes that "" ,but mongodb cannot read it
  const token = JSON.stringify(localStorage.getItem("token"));
  let newToken = token.split("");
  newToken.pop();
  newToken.shift();
  let newNewToken = newToken.join("");

  try {
    const response = await api.post("/user", { _id: newNewToken });
    return dispatch({ type: AUTH_GET_USER_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: AUTH_GET_USER_ERROR,
      payload: "Not Found Account.You must login...",
    });
  }
};
