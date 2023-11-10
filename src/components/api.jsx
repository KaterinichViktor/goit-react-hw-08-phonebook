export const loginUserApi = async (userData) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUserApi = async (token) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const registerUserApi = async (userData) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUserApi = async (token) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/users/current', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getAllContactsApi = async (token) => {
//   try {
//     const response = await fetch('https://connections-api.herokuapp.com/contacts', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch contacts');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
export const getAllContactsApi = async (token) => {
  try {
    // console.log('Token used for fetching contacts:', token); // Додайте цей рядок для виведення токену в консоль
    const response = await fetch('https://connections-api.herokuapp.com/contacts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createContactApi = async (token, contactData) => {
  try {
    const response = await fetch('https://connections-api.herokuapp.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error('Failed to create contact');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactApi = async (token, contactId) => {
  try {
    const response = await fetch(`https://connections-api.herokuapp.com/contacts/${contactId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const updateContactApi = async (token, contactId, contactData) => {
  try {
    const response = await fetch(`https://connections-api.herokuapp.com/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error('Failed to update contact');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
