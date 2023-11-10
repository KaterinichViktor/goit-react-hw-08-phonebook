// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './components/App';
import { setToken, setUserEmail, setUserNickname } from './Redux/contactsSlice';

import './index.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const storedToken = localStorage.getItem('token');

if (storedToken) {
  store.dispatch(setToken(storedToken));

  const storedEmail = localStorage.getItem('userEmail');
  const storedNickname = localStorage.getItem('userNickname');

  if (storedEmail) {
    store.dispatch(setUserEmail(storedEmail));
  }

  if (storedNickname) {
    store.dispatch(setUserNickname(storedNickname));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



