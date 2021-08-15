import styled from "styled-components";
import Header from "./Header";
import { signup } from "../../store/actions/auth";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_RESET } from "../../store/constants/auth";

const StyledMain = styled.div`
  width: 25rem;
  height: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #404089;
  border-radius: 8px;
  margin-bottom: 4rem;
  padding: 1rem;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0 2rem 1rem 2rem;
  border-radius: 8px;
  border: 1px #404089 solid;
  padding-left: 1rem;
  font-size: 1rem;
`;

const StyledButton = styled.button`
  width: 10rem;
  height: 2.75rem;
  background-color: white;
  color: #404089;
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

const Signup = ({ changePage, isLoginPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.authReducer);

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    error && showErrorMessage(error);
  }, [error]);

  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    if (user.fullName && !token) {
      dispatch({ type: AUTH_RESET });
      changePage(true);
      return showSuccessMessage("You signed up successfully....");
    }
  }, [user, changePage, dispatch, token]);

  const signupForm = (e) => {
    e.preventDefault();
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return showErrorMessage("Please Provide Inputs Correctly ...");
    }

    const lengthOfPassword = password.split("").length;
    if (lengthOfPassword < 6) {
      return showErrorMessage("Password must le logger than 6 ...");
    }

    const userInfo = { fullName, email, password };
    dispatch(signup(userInfo));
  };

  return (
    <StyledMain>
      <Header changePage={changePage} isLoginPage={isLoginPage} />
      <StyledForm onSubmit={signupForm}>
        <StyledInput
          value={fullName}
          onChange={handleChangeFullName}
          placeholder="Full Name"
          type="text"
        />
        <StyledInput
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
          type="email"
        />
        <StyledInput
          value={password}
          onChange={handleChangePassword}
          placeholder="Password"
          type="password"
        />
        <StyledButton type="submit">Sign Up</StyledButton>
      </StyledForm>
    </StyledMain>
  );
};
export default Signup;
