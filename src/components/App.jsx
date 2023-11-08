
    // <div
    //   style={{
    //     height: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontSize: 40,
    //     color: '#010101'
    //   }}
    // >


// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
// import UserMenu from './UserMenu';
import Register from './Register';
import Login from './Login';
import Contacts from './Contacts';
import Header from './Header';
import Homepage from './Homepage';

function App() {
  return (
    <Router basename="/goit-react-hw-08-phonebook">
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        
        <Header/>
        {/* <Navigation /> */}
        <div className='container'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;

