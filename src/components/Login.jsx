import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserApi } from '../components/api';
import { setToken, setUserEmail } from '../Redux/contactsSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await loginUserApi(formData);

      // Збереження токену в Redux-сторі
      dispatch(setToken(userData.token));
      
      // Збереження імейла користувача в Redux-сторі
      dispatch(setUserEmail(formData.email));

      // Збереження токену в локальному сховищі
      localStorage.setItem('token', userData.token);

      localStorage.setItem('userEmail', formData.email);

      // Очистка форми
      setFormData({
        email: '',
        password: '',
      });

      console.log('Successful login:', userData);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
