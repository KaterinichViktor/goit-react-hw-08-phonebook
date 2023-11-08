import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './components/App';
import { setToken } from './Redux/contactsSlice';

import './index.css';

// Отримання токену з локального сховища
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(setToken(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


