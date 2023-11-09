// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css'


function Navigation() {
  return (
    <nav className='navigation'>
      <ul className='nav-links'>
        <li>
          <Link to="/register" className='main-link'>Signup</Link>
        </li>
        <li>
          <Link to="/login" className='main-link'>Login</Link>
        </li>
        {/* <li>
          <Link to="/contacts">Contacts</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navigation;
