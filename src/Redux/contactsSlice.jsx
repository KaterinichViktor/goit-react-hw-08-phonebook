import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllContactsApi } from '../components/api'; // Імпорт функцій API

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: '',
};

export const fetchContacts = createAsyncThunk('contacts/fetch', async () => {
  try {
    const data = await getAllContactsApi();
    return data;
  } catch (error) {
    throw error;
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.data = state.data.filter((contact) => contact.id !== action.payload);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact, updateFilter } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.data;
export const selectFilter = (state) => state.contacts.filter;

export default contactsSlice.reducer;
