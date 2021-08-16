import {
  ADD_POST_ERROR,
  ADD_POST_LOADING,
  ADD_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_ERROR,
  GET_ALL_POSTS_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_DETAIL_POST_ERROR,
  GET_DETAIL_POST_LOADING,
  GET_DETAIL_POST_SUCCESS,
  GET_MY_POSTS_ERROR,
  GET_MY_POSTS_LOADING,
  GET_MY_POSTS_SUCCESS,
  RESET_GETTING_DATA,
  UPDATE_POST_ERROR,
  UPDATE_POST_LOADING,
  UPDATE_POST_SUCCESS,
} from "../constants/post";

const initialState = {
  allPosts: [],
  myPosts: [],
  detailPost: {},
  addedPost: null,
  updatedPost: null,
  deletedPost: null,
  error: "",
  getAllPostLoading: false,
  getDetailPostLoading: false,
  getMyPostsLoading: false,
  addPostLoading: false,
  updatePostLoading: false,
  deletePostLoading: false,
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
      return {
        ...state,
        addedPost: action.payload,
        error: "",
        addPostLoading: false,
      };
    case ADD_POST_LOADING:
      return { ...state, addedPost: null, error: "", addPostLoading: true };
    case ADD_POST_ERROR:
      return {
        ...state,
        addedPost: null,
        error: action.payload,
        addPostLoading: false,
      };
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
        myPosts: state.myPosts.map((item) => {
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
    case DELETE_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        deletedPost: action.payload,
        error: "",
        deletePostLoading: false,
        allPosts: state.allPosts.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case DELETE_POST_LOADING:
      return {
        ...state,
        deletedPost: null,
        deletePostLoading: true,
        error: "",
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        deletedPost: null,
        error: action.payload,
        deletePostLoading: false,
      };
    case RESET_GETTING_DATA:
      return {
        ...state,
        deletedPost: null,
        updatedPost: null,
        addedPost: null,
      };
    default:
      return { ...state };
  }
};

export default post;
