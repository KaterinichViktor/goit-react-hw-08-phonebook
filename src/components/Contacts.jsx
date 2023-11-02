import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, selectContacts, selectFilter, updateFilter } from '../Redux/contactsSlice';
import {
  getAllContactsApi,
  createContactApi,
  deleteContactApi,
} from '../components/api'; // Імпорт функцій API

const Contacts = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter); // Додано вибірку фільтру

  const isNameUnique = () => {
    return !contacts.some((contact) => contact.name === name);
  };

  useEffect(() => {
    // Отримати список контактів користувача та оновити стан "contacts" при завантаженні компоненту
    getAllContactsApi()
      .then((data) => {
        dispatch(addContact(data));
      })
      .catch((error) => {
        console.error('Помилка при отриманні списку контактів:', error);
      });
  }, [dispatch]);

  const handleAddContact = () => {
    if (name === '' || number === '') {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    if (!isNameUnique()) {
      alert("Це ім'я вже існує. Виберіть інше ім'я.");
      return;
    }

    const newContact = {
      name,
      number,
    };

    createContactApi(newContact)
      .then((data) => {
        dispatch(addContact(data));
        setName('');
        setNumber('');
      })
      .catch((error) => {
        console.error('Помилка при додаванні на сервер:', error);
      });
  };

  const handleDeleteContact = (contactId) => {
    // Видалити контакт за його ідентифікатором
    deleteContactApi(contactId)
      .then(() => {
        dispatch(deleteContact(contactId));
      })
      .catch((error) => {
        console.error('Помилка при видаленні контакту:', error);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          name="number"
          placeholder="Номер телефону"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="button" onClick={handleAddContact}>
          Додати контакт
        </button>
      </form>
      <h2>Contacts</h2>
      <input
        type="text"
        placeholder="Фільтр за ім'ям"
        value={filter}
        onChange={(e) => dispatch(updateFilter(e.target.value))}
      />
      <ul>
        {contacts
          .filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()))
          .map((contact) => (
            <li key={contact.id}>
              {contact.name} ({contact.number})
              <button onClick={() => handleDeleteContact(contact.id)}>Видалити</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Contacts;
