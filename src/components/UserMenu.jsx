import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, selectToken } from '../Redux/contactsSlice';
import { logoutUserApi } from '../components/api';

function UserMenu() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const userEmail = localStorage.getItem('userEmail');


  const handleLogout = async () => {
    try {
      await logoutUserApi(token);
      dispatch(setToken(''));
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserMenu;
