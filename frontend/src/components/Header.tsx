import React from 'react';
import { FaListAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <FaListAlt /> Fancy Todo List
      </h1>
    </header>
  );
};

export default Header;
