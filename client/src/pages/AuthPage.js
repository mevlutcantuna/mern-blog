import styled from "styled-components";
import { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();

  const changePage = (value) => {
    setIsLoginPage(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/blogs");
    }
  }, [history, user]);

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
