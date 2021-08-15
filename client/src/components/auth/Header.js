import styled from "styled-components";

const StyledMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #242457;
  color: white;
  border-radius: 8px;
  margin: 1rem 1rem 2rem 1rem;
  padding: 1rem 0;
  letter-spacing: 1px;
  ${({ isRight }) => isRight && `margin-right:8px;`};

  ${({ active }) => active && "background:#1c1132;"}
  :hover {
    background-color: #484a90;
    ${({ active }) => active && "background-color: #1c1132;"}
  }

  :active {
    background-color: #1c1132;
  }
`;

const Header = ({ changePage, isLoginPage }) => {
  console.log(isLoginPage);
  return (
    <StyledMain>
      <StyledButton
        isRight
        active={isLoginPage}
        onClick={() => changePage(true)}
      >
        Log In
      </StyledButton>
      <StyledButton active={!isLoginPage} onClick={() => changePage(false)}>
        Sign Up
      </StyledButton>
    </StyledMain>
  );
};

export default Header;
