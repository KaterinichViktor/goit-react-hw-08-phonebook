// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/homepage.css'


function Navigation() {
  return (
    <nav className='navigation'>
      <ul className='nav-links'>
        <li>
          <NavLink to="/register" activeClassName="active-link">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active-link">Login</NavLink>
        </li>
        {/* <li>
          <Link to="/contacts">Contacts</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navigation;
