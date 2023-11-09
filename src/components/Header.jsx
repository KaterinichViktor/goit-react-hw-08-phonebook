import React from 'react';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectToken } from '../Redux/contactsSlice';

import '../css/header.css'

function Header() {
  
  const token = useSelector(selectToken);

  return (
    <header className='header'>
      <Link to="/" className='logo'>Contact Book</Link>
      {token && ( 
        <Link to="/contacts" className='contacts-link'>Contacts</Link>
      )}
      
      <UserMenu />
    </header>
  );
}


export default Header;