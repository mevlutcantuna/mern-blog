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
  UPDATE_POST_ERROR,
  UPDATE_POST_LOADING,
  UPDATE_POST_SUCCESS,
} from "../constants/post";

const initialState = {
  allPosts: [],
  myPosts: [],
  addedPost: null,
  detailPost: {},
  updatedPost: null,
  error: "",
  getAllPostLoading: false,
  getDetailPostLoading: false,
  getMyPostsLoading: false,
  updatePostLoading: false,
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.payload,
        error: "",
        getAllPostLoading: false,
      };
    case GET_ALL_POSTS_LOADING:
      return { ...state, allPosts: [], error: "", getAllPostLoading: true };
    case GET_ALL_POSTS_ERROR:
      return {
        ...state,
        allPosts: [],
        error: action.payload,
        getAllPostLoading: false,
      };
    case GET_MY_POSTS_SUCCESS:
      return {
        ...state,
        myPosts: action.payload,
        error: "",
        getMyPostsLoading: false,
      };
    case GET_MY_POSTS_LOADING:
      return { ...state, myPosts: [], error: "", getMyPostsLoading: true };
    case GET_MY_POSTS_ERROR:
      return {
        ...state,
        myPosts: {},
        error: action.payload,
        getMyPostsLoading: false,
      };
    case ADD_POST_SUCCESS:
      return { ...state, addedPost: action.payload, error: "" };
    case ADD_POST_ERROR:
      return { ...state, addedPost: null, error: action.payload };
    case GET_DETAIL_POST_SUCCESS:
      return {
        ...state,
        detailPost: action.payload,
        error: "",
        getDetailPostLoading: false,
      };
    case GET_DETAIL_POST_LOADING:
      return {
        ...state,
        detailPost: {},
        error: "",
        getDetailPostLoading: true,
      };
    case GET_DETAIL_POST_ERROR:
      return {
        ...state,
        detailPost: {},
        error: action.payload,
        getDetailPostLoading: false,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        allPosts: state.allPosts.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        }),
        updatedPost: action.payload,
        updatePostLoading: false,
        error: "",
      };
    case UPDATE_POST_LOADING:
      return {
        ...state,
        updatedPost: null,
        updatePostLoading: true,
        error: "",
      };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        updatedPost: null,
        updatePostLoading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default post;
