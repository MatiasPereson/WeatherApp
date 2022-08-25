import React from 'react';
import Logo from '../logoHenry.png'
import SearchBar from './SearchBar.jsx';
import { AiOutlineCloud } from 'react-icons/ai'
import './Nav.css';

function Nav({ onSearch }) {
  return (
    <nav class="navbar navbar-light">
      <a class="navbar-brand">
        <div id="logoHenry">
          <AiOutlineCloud />
        <h5>Weather App</h5>
        </div>
      </a>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Nav;
