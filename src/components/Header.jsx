import React from 'react';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';

import '../css/header.css'

function Header() {
  return (
    <header className='header'>
      <Link to="/" className='logo'>Contact Book</Link>
      <UserMenu />
    </header>
  );
}


export default Header;