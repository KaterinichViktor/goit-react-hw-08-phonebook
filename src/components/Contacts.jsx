import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';


import '../css/contacts.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  selectContacts,
  selectFilter,
  updateFilter,
  selectToken, // Додаємо вибірку токену
} from '../Redux/contactsSlice';
import {
  getAllContactsApi,
  createContactApi,
  deleteContactApi,
} from '../components/api';

const Contacts = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [code, setCode] = useState('');
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const token = useSelector(selectToken); // Отримуємо токен із стору

  const isNameUnique = () => {
    return !contacts.some((contact) => contact.name === name);
  };

  useEffect(() => {
    if (contacts.length === 0) {
      getAllContactsApi(token)
        .then((data) => {
          // Оновлюємо список контактів в сторі
          dispatch(addContact(data));
        })
        .catch((error) => {
          console.error('Помилка при отриманні списку контактів:', error);
        });
    }
  }, [dispatch, token, contacts]);
  
  

  const handleAddContact = () => {
    if (name === '' || code === '' || number === '') {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    if (!isNameUnique()) {
      alert("Це ім'я вже існує. Виберіть інше ім'я.");
      return;
    }
    if (code.length < 2){
      alert("Введіть повний код країни");
      return;
    }
    if (number.length < 10){
      alert("Введіть повний номер телефону");
      return;
    }

    setModalIsOpen(false);
    const newContact = {
      name,
      number: `${code}${number}`,
    };

    createContactApi(token, newContact)
    .then((data) => {
      dispatch(addContact(data));
      setName('');
      setCode('');
      setNumber('');
    })
    .catch((error) => {
      console.error('Помилка при додаванні на сервер:', error);
    });
};
  
  

  const handleDeleteContact = (contactId) => {
    deleteContactApi(token, contactId) // Використовуємо токен для видалення контакта
      .then(() => {
        dispatch(deleteContact(contactId));
      })
      .catch((error) => {
        console.error('Помилка при видаленні контакту:', error);
      });
  };



return (
  <div>
    <div className='contacts-header'>
      <h2 className='h2-contacts'>Contacts</h2>
      
      <div className='filter-box'>
        <input
          type="text"
          placeholder="Filter by name"
          name='filter'
          id='filter'
          value={filter}
          onChange={(e) => dispatch(updateFilter(e.target.value))}
          className='contacts-filter'
        />
        <label htmlFor="filter" className="search">
            <svg fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" viewBox="0 0 490.4 490.4">
              <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796 c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
            </svg>
          </label>
      </div>
      

    </div>
    
    <ul className="contacts-list">
      {contacts
        .filter((contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map((contact) => (
          <li key={contact.id} className='contacts-item'>
            <div className="contact-avatar" style={{ backgroundColor: contact.color }}>{contact.name.charAt(0).toUpperCase()}</div>
            <div className="contact-info">
                <p className='contact-name'>{contact.name} </p>
                <a className='contact-phone' href={`tel:+${contact.number}`}>+{contact.number.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</a>
            </div>
            <button onClick={() => handleDeleteContact(contact.id)} className='delete-contact-btn'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="#fb8e6d" d="M10.806641 2 C10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L9 3 L4 3 A1.0001 1.0001 0 1 0 4 5 L20 5 A1.0001 1.0001 0 1 0 20 3 L15 3 L14.570312 2.5703125 C14.205312 2.2043125 13.710359 2 13.193359 2 L10.806641 2 z M4.3652344 7 L5.8925781 20.263672 C6.0245781 21.253672 6.877 22 7.875 22 L16.123047 22 C17.121047 22 17.974422 21.254859 18.107422 20.255859 L19.634766 7 L4.3652344 7 z"></path>
              </svg>
            </button>
          </li>
        ))}
      <li className='contacts-add'>
        <button onClick={() => setModalIsOpen(true)} className="add-contact-btn">
        + Add contact
        </button>
      </li>
    </ul>

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          // position: 'absolute',
          inset: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '360px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',

        }
      }}
    >
      <h2 className='add-contact-header'>Add Contact</h2>
      <svg
        width="24"
        height="24"
        viewBox="0 0 280 280"
        fill="#428ccc"
        onClick={() => setModalIsOpen(false)}
        className="modal-close-btn"
      >
        <path d="M275.456,0H4.544C2.034,0,0,2.035,0,4.544v270.911C0,277.965,2.034,280,4.544,280h270.911c2.509,0,4.544-2.035,4.544-4.544 V4.544C280,2.035,277.965,0,275.456,0z M212.529,191.316l-21.213,21.213L140,161.213l-51.316,51.316l-21.213-21.213 L118.787,140L67.471,88.684l21.213-21.213L140,118.787l51.316-51.316l21.213,21.213L161.213,140L212.529,191.316z" />
      </svg>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='input-add-contact'
        minLength="3"
        maxLength="15"
      />
      <div className='number-input-box'>
      <input
        type="tel"
        name="country-code"
        placeholder=""
        value={code}
        onChange={(e) => {
          const input = e.target.value;
          const regex = /^[0-9]*$/; // Регулярний вираз, що дозволяє тільки цифри
          if (regex.test(input) && input.length <= 2) {
            setCode(input);
          }
        }}
        className='input-add-contact-code'
        maxLength="2"
      />

      <label htmlFor="country-code" className='plus'>+</label>

      <input
        type="tel"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => {
          const input = e.target.value;
          const regex = /^[0-9]*$/; // Регулярний вираз, що дозволяє тільки цифри
          if (regex.test(input) && input.length <= 10) {
            setNumber(input);
          }
        }}
        className='input-add-contact-number'
        maxLength="10"
        minLength="10"
      />
      </div>
      
      <button onClick={handleAddContact} className='add-contact-submit-btn'>Add contact</button>
    </Modal>
    
  </div>
);
};

export default Contacts;