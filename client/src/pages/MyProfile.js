import Navbar from "../components/Navbar";
import PostModal from "../components/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyPosts } from "../store/actions/post";
import { Spin } from "antd";
import Card from "../components/Card";
import styled from "styled-components";
import { addPost } from "../store/actions/post";
import { showErrorMessage, showSuccessMessage } from "../utils/showMessages";

const StyledContainer = styled.div`
  margin: 0 5%;
  display: flex;

  @media only screen and (max-width: 1120px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;

  @media only screen and (max-width: 1120px) {
    margin-bottom: 1rem;
  }
`;

const StyledImage = styled.img`
  width: 15rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const StyledUserName = styled.div`
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
  color: #555454;
`;

const StyledPostCount = styled.div`
  text-align: center;
  font-size: 1.25rem;
  color: #5f5f5f;
`;

const StyledPosts = styled.div`
  padding: 1rem 2rem 2rem 2rem;
  background-color: #faf9f9;
  border-radius: 4px;
  width: 100%;

  @media only screen and (max-width: 500px) {
    padding: 1rem 0.5rem;
  }
`;

const StyledAddPostButton = styled.button`
  width: 10rem;
  height: 2.75rem;
  background-color: #1c1132;
  color: white;
  border-radius: 8px;
  border: none;
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 1rem;

  :hover {
    background-color: #2e2e61;
    color: white;
  }

  :active {
    background-color: #1c1132;
    color: white;
  }
`;

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNotFoundPost = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const MyProfile = () => {
  const dispatch = useDispatch();
  const { getMyPostsLoading, myPosts } = useSelector(
    (state) => state.postReducer
  );
  const { user } = useSelector((state) => state.authReducer);
  const [isOpenAddPost, setIsOpenAddPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostSummary, setNewPostSummary] = useState("");
  const [newPostDetails, setNewPostDetails] = useState("");
  const [newPostImage, setNewPostImage] = useState("");

  const changeIsOpenAddPost = (value) => setIsOpenAddPost(value);
  const handleChangeNewPostTitle = (e) => setNewPostTitle(e.target.value);
  const handleChangeNewPostSummary = (e) => setNewPostSummary(e.target.value);
  const handleChangeNewPostDetails = (e) => setNewPostDetails(e.target.value);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const addNewPost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const post = {
      user: token,
      author: user.fullName,
      title: newPostTitle,
      summary: newPostSummary,
      details: newPostDetails,
      picture: newPostImage,
    };

    if (
      newPostTitle.trim() === "" ||
      newPostSummary.trim() === "" ||
      newPostDetails.trim() === "" ||
      newPostImage.trim() === ""
    ) {
      return showErrorMessage("Please Fill all inputs out...");
    } else {
      dispatch(addPost(post));
      if (!myPosts.length > 0) {
        return showErrorMessage("Something is Wrong.You could not add post...");
      } else {
        changeIsOpenAddPost(false);
        dispatch(getMyPosts());
        return showSuccessMessage("You Add your Post Correctly....");
      }
    }
  };

  const myProfilePropsNewPost = {
    postTitle: newPostTitle,
    postSummary: newPostSummary,
    postDetails: newPostDetails,
    postImage: newPostImage,
    handlePostTitle: handleChangeNewPostTitle,
    handlePostSummary: handleChangeNewPostSummary,
    handlePostDetails: handleChangeNewPostDetails,
    handlePostImage: setNewPostImage,
    openPost: isOpenAddPost,
    changeOpenPost: changeIsOpenAddPost,
    modalName: "Add New Post",
    modalButtonName: "Add Post",
    postFunc: addNewPost,
  };

  return (
    <>
      <Navbar />
      <Spin spinning={getMyPostsLoading}>
        <StyledContainer>
          <StyledProfile>
            <StyledImage src={user.picture} />
            <StyledUserName>{user.fullName}</StyledUserName>
            <StyledPostCount>Post Count : {myPosts.length}</StyledPostCount>
          </StyledProfile>
          <StyledPosts>
            <StyledAddPostButton onClick={() => changeIsOpenAddPost(true)}>
              New Post
            </StyledAddPostButton>
            {myPosts.length > 0 ? (
              <StyledCards>
                {myPosts.map((item) => (
                  <Card item={item} key={item._id} />
                ))}
              </StyledCards>
            ) : (
              <StyledNotFoundPost>You don't have any Posts.</StyledNotFoundPost>
            )}
          </StyledPosts>
        </StyledContainer>
      </Spin>
      <PostModal myProfilePropsPost={myProfilePropsNewPost} />
    </>
  );
};
export default MyProfile;
