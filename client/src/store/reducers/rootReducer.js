import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";

export const rootReducer = combineReducers({
  authReducer: auth,
  postReducer: post,
});
