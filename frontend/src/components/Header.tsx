import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        😍
      </Logo>
      <Title>Marvelous To Do</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #1e88e5;
  color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  background-color: #fff;
  color: #1e88e5;
  border-radius: 50%;
  font-size: 2.5rem;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 0;
`;

export default Header;
