// import React, { useState } from 'react';
// import { registerUserApi } from '../components/api';
// import { Link } from 'react-router-dom';

// import '../css/login-register.css'

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Відправити дані реєстрації на сервер
//     registerUserApi(formData)
//       .then((response) => {
//         // Обробка успішної реєстрації
//         console.log('Користувач зареєстрований:', response);
//       })
//       .catch((error) => {
//         // Обробка помилки реєстрації
//         console.error('Помилка реєстрації:', error);
//       });
//   };

//   return (
//     <div className='register'>
//       <h2 className='form-header'>Signup</h2>
//       <form onSubmit={handleSubmit} className='register-form'>
//         <label className='register-label'>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className='register-input' placeholder='Nickname'/>
//         </label>
//         {/* <br /> */}
//         <label className='register-label'>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} className='register-input' placeholder='Email'/>
//         </label>
//         {/* <br /> */}
//         <label className='register-label'>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} className='register-input' placeholder='Password'/>
//         </label>
//         {/* <br /> */}
//         <button type="submit" className='register-btn'>Signup</button>

//         <p className='hint'>Already have an account? <Link to="/login" className='hint-link' >Login</Link></p>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { registerUserApi } from '../components/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../css/login-register.css';
import { setUserNickname } from 'Redux/contactsSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Відправити дані реєстрації на сервер
    registerUserApi(formData)
      .then((response) => {
        // Обробка успішної реєстрації
        console.log('Користувач зареєстрований:', response);

        // Зберегти імейл та нік у локальне сховище
        dispatch(setUserNickname(formData.name));

        localStorage.setItem('userEmailSignup', formData.email);
        localStorage.setItem('userNickname', formData.name);

        // Використовуємо navigate для переходу на сторінку логіну
        navigate('/login');
      })
      .catch((error) => {
        // Обробка помилки реєстрації
        console.error('Помилка реєстрації:', error);
      });
  };

  return (
    <div className='register'>
      <h2 className='form-header'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <label className='register-label'>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='register-input' placeholder='Nickname'/>
        </label>
        <label className='register-label'>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='register-input' placeholder='Email'/>
        </label>
        <label className='register-label'>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='register-input' placeholder='Password'/>
        </label>
        <button type="submit" className='register-btn'>Sign Up</button>
        <p className='hint'>Already have an account? <Link to="/login" className='hint-link' >SIgn In</Link></p>
      </form>
    </div>
  );
}

export default Register;
