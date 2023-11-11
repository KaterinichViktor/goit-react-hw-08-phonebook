// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUserApi } from '../components/api';
// import { setToken, setUserEmail } from '../Redux/contactsSlice';
// import { Link } from 'react-router-dom';

// import '../css/login-register.css'

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const userData = await loginUserApi(formData);

//       // Збереження токену в Redux-сторі
//       dispatch(setToken(userData.token));
      
//       // Збереження імейла користувача в Redux-сторі
//       dispatch(setUserEmail(formData.email));

//       // Збереження токену в локальному сховищі
//       localStorage.setItem('token', userData.token);

//       localStorage.setItem('userEmail', formData.email);

//       // Очистка форми
//       setFormData({
//         email: '',
//         password: '',
//       });

//       console.log('Successful login:', userData);
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('Login failed. Please check your credentials.');
//     }
//   }

//   return (
//     <div className='login'>
//       <h2 className='form-header'>Login</h2>
//       <form onSubmit={handleSubmit} className='login-form'>
//         <label className='login-label'>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} className='login-input' placeholder='Email Address'/>
//         </label>
//         {/* <br /> */}
//         <label className='login-label'>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} className='login-input' placeholder='Password'/>
//         </label>
//         {/* <br /> */}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit" className='login-btn'>Login</button>
//         <p className='hint'>Don't have an account? <Link to="/register" className='hint-link'>Signup</Link></p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserApi } from '../components/api';
import { setToken, setUserEmail } from '../Redux/contactsSlice';
import { Link, useNavigate } from 'react-router-dom';

import '../css/login-register.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ефект, який викликається після рендеру компоненту
  useEffect(() => {
    // Отримання збереженого імейлу з локального сховища
    const storedEmail = localStorage.getItem('userEmailSignup');

    // Якщо імейл збережений, встановлюємо його у стан компоненту
    if (storedEmail) {
      setFormData((prevFormData) => ({ ...prevFormData, email: storedEmail }));
    }
  }, []); // Пустий масив дозволяє ефекту виконатися тільки після монтажу компоненту

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

      navigate('/contacts');

    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login'>
      <h2 className='form-header'>Sign In</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <label className='login-label'>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='login-input' placeholder='Email Address'/>
        </label>
        <label className='login-label'>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='login-input' placeholder='Password'/>
        </label>
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        <button type="submit" className='login-btn'>Sign In</button>
        <p className='hint'>Don't have an account? <Link to="/register" className='hint-link'>Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
