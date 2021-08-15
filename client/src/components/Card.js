import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";
import UpdateIcon from "../assets/update.svg";
import { useState } from "react";
import PostModal from "./PostModal";
import { showErrorMessage } from "../utils/showMessages";

const StyledMain = styled.div`
  margin-bottom: 3rem;
  cursor: pointer;
  display: flex;
  padding: 1rem;
  border-radius: 4px;
  transition: background-color 0.5s;

  :hover {
    background-color: #f3f2f2;
  }

  @media only screen and (max-width: 775px) {
    flex-direction: column;
    align-items: center;
    margin: 0 10%;
  }

  @media only screen and (max-width: 450px) {
    margin: 0 0;
    padding: 1px;
  }
`;

const StyledImage = styled.img`
  min-width: 20rem;
  width: 28rem;
  max-width: 28rem;
  height: 15rem;
  border-radius: 6px;
  margin-right: 2rem;
  object-fit: contain;

  @media only screen and (max-width: 720px) {
    margin: 1rem 10%;
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    margin: 1rem 5%;
    min-width: 100%;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (max-width: 720px) {
    padding: 0 10%;
  }

  @media only screen and (max-width: 600px) {
    margin: 0 5%;
  }

  @media only screen and (max-width: 450px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledTop = styled.div`
  display: flex;
`;

const StyledTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  flex: 1;
`;

const StyledUpdatedButton = styled.div`
  width: 5rem;
  text-align: center;
`;

const StyledSummary = styled.div`
  color: #9a9a9a;
  font-size: 1rem;
  height: 9rem;
`;

const StyledInfoBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  background-color: #404089;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-right: 1rem;

  :hover {
    background-color: #1d1d8b;
  }
`;

const StyledCreatedAt = styled.div`
  font-weight: 600;
  letter-spacing: 1px;
  color: #adacac;
`;

const Card = ({ item }) => {
  const history = useHistory();
  const readMore = (id) => {
    history.push(`/blogs/${id}`);
  };

  const [isOpenUpdatePost, setIsOpenUpdatePost] = useState(false);
  const [updatePostTitle, setUpdatePostTitle] = useState(item.title);
  const [updatePostSummary, setUpdatePostSummary] = useState(item.summary);
  const [updatePostDetails, setUpdatePostDetails] = useState(item.details);
  const [updatePostImage, setUpdatePostImage] = useState("");

  const changeIsOpenUpdatePost = (value) => setIsOpenUpdatePost(value);
  const handleChangeUpdatePostTitle = (e) => setUpdatePostTitle(e.target.value);
  const handleChangeUpdatePostSummary = (e) =>
    setUpdatePostSummary(e.target.value);
  const handleChangeUpdatePostDetails = (e) =>
    setUpdatePostDetails(e.target.value);

  const updatePost = (e) => {
    e.preventDefault();

    if (
      updatePostTitle.trim() === "" ||
      updatePostSummary.trim() === "" ||
      updatePostDetails.trim() === "" ||
      updatePostImage.trim() === ""
    ) {
      return showErrorMessage("Please Fill all Inputs out...");
    }
  };

  const myProfilePropsUpdatePost = {
    postTitle: updatePostTitle,
    postSummary: updatePostSummary,
    postDetails: updatePostDetails,
    postImage: updatePostImage,
    handlePostTitle: handleChangeUpdatePostTitle,
    handlePostSummary: handleChangeUpdatePostSummary,
    handlePostDetails: handleChangeUpdatePostDetails,
    handlePostImage: setUpdatePostImage,
    openPost: isOpenUpdatePost,
    changeOpenPost: changeIsOpenUpdatePost,
    modalName: "Update Post",
    modalButtonName: "Update Post",
    postFunc: updatePost,
  };

  return (
    <StyledMain>
      <StyledImage alt="picture" src={item.picture} />
      <StyledInfo>
        <StyledTop>
          <StyledTitle>{item.title}</StyledTitle>
          <StyledUpdatedButton>
            <img
              onClick={() => changeIsOpenUpdatePost(true)}
              src={UpdateIcon}
              alt="update-icon"
            />
          </StyledUpdatedButton>
        </StyledTop>
        <StyledSummary>{item.summary}</StyledSummary>
        <StyledInfoBottom>
          <StyledButton onClick={() => readMore(item._id)}>
            Read More
          </StyledButton>
          <StyledCreatedAt>{moment(item.createdAt).fromNow()}</StyledCreatedAt>
        </StyledInfoBottom>
      </StyledInfo>
      <PostModal myProfilePropsPost={myProfilePropsUpdatePost} />
    </StyledMain>
  );
};

export default Card;
