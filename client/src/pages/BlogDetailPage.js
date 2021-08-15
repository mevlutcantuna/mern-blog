import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailPost } from "../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Spin } from "antd";

const StyledContainer = styled.div`
  margin: 0 30%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1200px) {
    margin: 0 25%;
  }

  @media only screen and (max-width: 1000px) {
    margin: 0 20%;
  }

  @media only screen and (max-width: 800px) {
    margin: 0 10%;
  }

  @media only screen and (max-width: 550px) {
    margin: 0 2%;
  } ;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: fill;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const StyledInfo = styled.div`
  margin: 0 2%;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const StyledSummary = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #bdbcbc;
  margin-bottom: 0.5rem;
`;

const StyledAuthor = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.8px;
  color: #41417f;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StyledDetail = styled.div``;

const BlogDetailPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { detailPost, getDetailPostLoading } = useSelector(
    (state) => state.postReducer
  );

  useEffect(() => {
    dispatch(getDetailPost(id));
  }, [id, dispatch]);

  return (
    <>
      <Navbar />
      <Spin spinning={getDetailPostLoading}>
        <StyledContainer>
          <StyledImage src={detailPost.picture} />
          <StyledInfo>
            <StyledTitle>{detailPost.title}</StyledTitle>
            <StyledSummary>{detailPost.summary}</StyledSummary>
            <StyledAuthor>{detailPost.author}</StyledAuthor>
            <StyledDetail>{detailPost.details}</StyledDetail>
          </StyledInfo>
        </StyledContainer>
      </Spin>
    </>
  );
};
export default BlogDetailPage;
