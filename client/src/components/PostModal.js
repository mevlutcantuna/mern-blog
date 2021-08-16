import { Modal } from "antd";
import styled from "styled-components";
import FileBase64 from "react-file-base64";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFormName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  margin: 0 2rem 1rem 2rem;
  border-radius: 8px;
  border: 1px #404089 solid;
  padding-left: 1rem;
  font-size: 1rem;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const StyledTextArea = styled.textarea`
  width: 25rem;
  margin: 0 2rem 1rem 2rem;
  border-radius: 8px;
  border: 1px #404089 solid;
  padding-left: 1rem;
  padding-top: 0.5rem;
  font-size: 1rem;
  resize: none;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const StyledImageInput = styled.div`
  input {
    cursor: pointer;
    color: #9e9e9e;
    width: 25rem;
    margin-bottom: 1rem;
  }

  input::-webkit-file-upload-button {
    background: #2e2e61;
    border: 0;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
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

  :hover {
    background-color: #2e2e61;
    color: white;
  }

  :active {
    background-color: #1c1132;
    color: white;
  }
`;

const PostModal = ({ myProfilePropsPost }) => {
  const {
    postTitle,
    postSummary,
    postDetails,
    handlePostTitle,
    handlePostSummary,
    handlePostDetails,
    handlePostImage,
    openPost,
    changeOpenPost,
    modalName,
    modalButtonName,
    postFunc,
  } = myProfilePropsPost;

  return (
    <Modal
      title={null}
      visible={openPost}
      footer={null}
      onOk={() => changeOpenPost(true)}
      onCancel={() => changeOpenPost(false)}
    >
      <StyledForm onSubmit={postFunc}>
        <StyledFormName>{modalName}</StyledFormName>
        <StyledInput
          value={postTitle}
          onChange={handlePostTitle}
          placeholder="Post Title..."
        />
        <StyledInput
          value={postSummary}
          onChange={handlePostSummary}
          placeholder="Post Summary..."
        />
        <StyledTextArea
          value={postDetails}
          rows="5"
          placeholder="Post Details..."
          onChange={handlePostDetails}
        />
        <StyledImageInput>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => handlePostImage(base64)}
          />
        </StyledImageInput>

        <StyledButton>{modalButtonName}</StyledButton>
      </StyledForm>
    </Modal>
  );
};

export default PostModal;
