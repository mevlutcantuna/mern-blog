import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { getAllPosts } from "../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import { Spin } from "antd";
import { showSuccessMessage } from "../utils/showMessages";
import { RESET_GETTING_DATA } from "../store/constants/post";

const StyledMain = styled.div`
  margin: 0 20%;

  @media only screen and (max-width: 1230px) {
    margin: 0 10%;
  }

  @media only screen and (max-width: 920px) {
    margin: 0 2%;
  }
`;

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlogsPage = () => {
  const dispatch = useDispatch();
  const {
    allPosts,
    getAllPostLoading,
    deletePostLoading,
    updatePostLoading,
    addPostLoading,
    updatedPost,
    deletedPost,
  } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch({ type: RESET_GETTING_DATA });
  }, [dispatch]);

  useEffect(() => {
    if (updatedPost) {
      dispatch(getAllPosts());
      dispatch({ type: RESET_GETTING_DATA });
      return showSuccessMessage("The Post is Updated Successfully...");
    }
  }, [updatedPost, dispatch]);

  useEffect(() => {
    if (deletedPost) {
      dispatch(getAllPosts());
      dispatch({ type: RESET_GETTING_DATA });
      return showSuccessMessage("The Post is Deleted Successfully...");
    }
  }, [dispatch, deletedPost]);

  return (
    <>
      <Navbar />
      <Spin
        spinning={
          getAllPostLoading ||
          deletePostLoading ||
          updatePostLoading ||
          addPostLoading
        }
      >
        <StyledMain>
          {allPosts.length > 0 && (
            <StyledCards>
              {allPosts.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </StyledCards>
          )}
        </StyledMain>
      </Spin>
    </>
  );
};

export default BlogsPage;
