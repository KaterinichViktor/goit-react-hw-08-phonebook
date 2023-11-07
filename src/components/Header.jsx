import React from 'react';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

import '../css/header.css'

function Header() {
  return (
    <header className='header'>
      <p className='logo'>Contact Book</p>
      <UserMenu />
    </header>
  );
}


export default Header;