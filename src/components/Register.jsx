// import React, { useState } from 'react';

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
//     // Додайте код для обробки реєстрації користувача з використанням formData
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </label>
//         <br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { registerUserApi } from '../components/api';
import { Link } from 'react-router-dom';

import '../css/login-register.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
      })
      .catch((error) => {
        // Обробка помилки реєстрації
        console.error('Помилка реєстрації:', error);
      });
  };

  return (
    <div className='register'>
      <h2 className='form-header'>Signup</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <label className='register-label'>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='register-input' placeholder='Nickname'/>
        </label>
        {/* <br /> */}
        <label className='register-label'>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='register-input' placeholder='Email'/>
        </label>
        {/* <br /> */}
        <label className='register-label'>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='register-input' placeholder='Password'/>
        </label>
        {/* <br /> */}
        <button type="submit" className='register-btn'>Register</button>

        <p className='hint'>Already have an account? <Link to="/login" className='hint-link' >Login</Link></p>
      </form>
    </div>
  );
}

export default Register;

