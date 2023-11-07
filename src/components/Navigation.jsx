// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css'

function Navigation() {
  return (
    <nav className='navigation'>
      <ul className='nav-links'>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* <li>
          <Link to="/contacts">Contacts</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navigation;
