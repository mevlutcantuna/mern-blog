import styled from "styled-components";
import Header from "./Header";
import { useEffect, useState } from "react";
import { login } from "../../store/actions/auth";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";
import { useDispatch, useSelector } from "react-redux";

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

const Login = ({ changePage, isLoginPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.authReducer);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    error && showErrorMessage(error);
  }, [error]);

  useEffect(() => {
    user.fullName && showSuccessMessage("You have successfully logged in!");
  }, [user.fullName]);

  const loginForm = (e) => {
    e.preventDefault();
    // check inputs
    if (email.trim() === "" && password.trim() === "") {
      return showErrorMessage("Please Provide Inputs Correctly...");
    }

    // check length of password
    const lengthOfPassword = password.split("").length;
    if (lengthOfPassword < 6) {
      return showErrorMessage("Password must be logger than 6...");
    }

    // login
    const userInfo = { email, password };
    dispatch(login(userInfo));
  };

  return (
    <StyledMain>
      <Header changePage={changePage} isLoginPage={isLoginPage} />
      <StyledForm onSubmit={loginForm}>
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
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </StyledMain>
  );
};

export default Login;
