import {
  ADD_POST_ERROR,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS_ERROR,
  GET_ALL_POSTS_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_DETAIL_POST_ERROR,
  GET_DETAIL_POST_LOADING,
  GET_DETAIL_POST_SUCCESS,
  GET_MY_POSTS_ERROR,
  GET_MY_POSTS_LOADING,
  GET_MY_POSTS_SUCCESS,
} from "../constants/post";
import api from "../../utils/api";

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POSTS_LOADING });
  try {
    const allPosts = await api.get("/all-posts");
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: allPosts.data });
  } catch (err) {
    return dispatch({
      type: GET_ALL_POSTS_ERROR,
      payload: "Something Happened Wrongly",
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  dispatch({ type: GET_MY_POSTS_LOADING });
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      console.log("Not Found Token...");
    } else {
      const myPosts = await api.post("/my-posts", { token });
      dispatch({ type: GET_MY_POSTS_SUCCESS, payload: myPosts.data });
    }
  } catch (err) {
    return dispatch({
      type: GET_MY_POSTS_ERROR,
      payload: "Something Happened Wrongly",
    });
  }
};

export const addPost = (post) => async (dispatch) => {
  console.log(post);
  try {
    const addedPost = await api.post("/add-post", post);
    dispatch({ type: ADD_POST_SUCCESS, payload: addedPost.data });
  } catch (err) {
    return dispatch({
      type: ADD_POST_ERROR,
      payload: "Something Happened Wrongly",
    });
  }
};

export const getDetailPost = (id) => async (dispatch) => {
  dispatch({ type: GET_DETAIL_POST_LOADING });
  try {
    if (id) {
      const detailPost = await api.post("/detail-post", { id });
      dispatch({ type: GET_DETAIL_POST_SUCCESS, payload: detailPost.data });
    } else {
      dispatch({
        type: GET_DETAIL_POST_ERROR,
        payload: "ID is not Correct...",
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_DETAIL_POST_ERROR,
      payload: "Something is Wrong...",
    });
  }
};
