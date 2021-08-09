import styled from "styled-components";
import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const StyledMain = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3;
`;

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const changePage = (value) => {
    setIsLoginPage(value);
  };

  return (
    <StyledMain>
      {isLoginPage ? (
        <Login changePage={changePage} isLoginPage={isLoginPage} />
      ) : (
        <Signup changePage={changePage} isLoginPage={isLoginPage} />
      )}
    </StyledMain>
  );
};
export default AuthPage;
