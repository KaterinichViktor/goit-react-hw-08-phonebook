import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUserEmail, selectUserNickname, logoutUser } from '../Redux/contactsSlice';
import { logoutUserApi } from '../components/api';

function UserMenu() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userEmail = useSelector(selectUserEmail);
  const userNickname = useSelector(selectUserNickname);

  const handleLogout = async () => {
    try {
      await logoutUserApi(token);
      dispatch(logoutUser());
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userEmailSignup');
      // localStorage.removeItem('userNickname');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <div className='user-menu'>
      {token && ( 
        <div className='user-menu-info'>
          <p className='user-menu-nick'>{userNickname}</p>
          <p className='user-menu-email'>{userEmail}</p>
        </div>
      )}
      <button onClick={handleLogout} className='logout-btn'>
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
