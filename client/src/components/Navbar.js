import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/auth";
import styled from "styled-components";
import Exit from "../assets/exit.svg";
import { useHistory } from "react-router-dom";
import { showSuccessMessage } from "../utils/showMessages";
import { AUTH_RESET } from "../store/constants/auth";
import { Spin } from "antd";

const StyledMain = styled.div`
  height: 4rem;
  background-color: #404089;
  box-shadow: 0 3px 10px gray;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20%;
  margin-bottom: 3rem;

  @media only screen and (max-width: 550px) {
    padding: 0 1%;
  }
`;

const StyledTitle = styled.div`
  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
`;

const StyledBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 134px;
`;

const StyledProfile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const StyledName = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: 1rem;
  cursor: pointer;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = localStorage.getItem("token");

  //when pages reload it's getting data again from db
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    dispatch({ type: AUTH_RESET });
    return showSuccessMessage("You successfully logged out....");
  };

  const toLogin = () => {
    dispatch({ type: AUTH_RESET });
    history.push("/");
  };

  const toBlogs = () => {
    history.push("/blogs");
  };

  const toMyProfile = () => {
    history.push("/my-profile");
  };

  return (
    <StyledMain>
      <StyledTitle onClick={toBlogs}>Blogs</StyledTitle>
      <StyledBar>
        {token ? (
          <>
            {Object.keys(user).length === 0 ? (
              <Spin />
            ) : (
              <>
                <div
                  onClick={toMyProfile}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StyledProfile alt="profile" src={user?.picture} />
                  <StyledName>{user?.fullName.split(" ")[0]}</StyledName>
                </div>
                <img
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                  src={Exit}
                  alt="exit"
                />
              </>
            )}
          </>
        ) : (
          <>
            <StyledName onClick={toLogin}>Login</StyledName>
          </>
        )}
      </StyledBar>
    </StyledMain>
  );
};

export default Navbar;
