import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>
        <FaListAlt /> Fancy Todo List
      </h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #4c4c4c;
  color: #fff;
  padding: 1rem 0;

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default Header;
