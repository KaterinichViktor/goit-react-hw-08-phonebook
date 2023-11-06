// import { createSlice } from '@reduxjs/toolkit';
// import { loginUserApi, logoutUserApi, registerUserApi, fetchCurrentUserApi, getAllContactsApi, createContactApi, deleteContactApi, updateContactApi } from '../components/api';

// const initialState = {
//   user: null,
//   token: null,
//   contacts: [],
//   error: null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginUserStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginUserSuccess: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.error = null;
//       state.loading = false;
//     },
//     loginUserError: (state, action) => {
//       state.user = null;
//       state.token = null;
//       state.error = action.payload;
//       state.loading = false;
//     },
//     logoutUserStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     logoutUserSuccess: (state) => {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       state.loading = false;
//     },
//     logoutUserError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     userRegistered: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.error = null;
//       state.loading = false;
//     },
//     registrationError: (state, action) => {
//       state.user = null;
//       state.token = null;
//       state.error = action.payload;
//       state.loading = false;
//     },
//     setContacts: (state, action) => {
//       state.contacts = action.payload;
//     },
//     createContactSuccess: (state, action) => {
//       state.contacts.push(action.payload);
//     },
//     deleteContactSuccess: (state, action) => {
//       state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
//     },
//     updateContactSuccess: (state, action) => {
//       state.contacts = state.contacts.map((contact) =>
//         contact.id === action.payload.id ? { ...contact, ...action.payload.data } : contact
//       );
//     },
//   },
// });

// export const { loginUserStart, loginUserSuccess, loginUserError, logoutUserStart, logoutUserSuccess, logoutUserError, clearError, userRegistered, registrationError, setContacts, createContactSuccess, deleteContactSuccess, updateContactSuccess } = authSlice.actions;

// export const loginUser = (userData) => async (dispatch) => {
//   try {
//     dispatch(loginUserStart());
//     const response = await loginUserApi(userData);
//     dispatch(loginUserSuccess(response));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export const logoutUser = () => async (dispatch) => {
//   try {
//     dispatch(logoutUserStart());
//     await logoutUserApi();
//     dispatch(logoutUserSuccess());
//   } catch (error) {
//     dispatch(logoutUserError(error.message));
//   }
// };

// export const registerUser = (userData) => async (dispatch) => {
//   try {
//     dispatch(loginUserStart());
//     const response = await registerUserApi(userData);
//     dispatch(userRegistered(response));
//   } catch (error) {
//     dispatch(registrationError(error.message));
//   }
// };

// export const fetchCurrentUser = () => async (dispatch, getState) => {
//   const { auth } = getState();
//   if (!auth.token) {
//     return;
//   }

//   try {
//     const response = await fetchCurrentUserApi(auth.token);
//     dispatch(loginUserSuccess(response));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export const getContacts = () => async (dispatch) => {
//   try {
//     const response = await getAllContactsApi();
//     dispatch(setContacts(response));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export const createContact = (contactData) => async (dispatch) => {
//   try {
//     const response = await createContactApi(contactData);
//     dispatch(createContactSuccess(response));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export const deleteContact = (contactId) => async (dispatch) => {
//   try {
//     await deleteContactApi(contactId);
//     dispatch(deleteContactSuccess(contactId));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export const updateContact = (contactId, contactData) => async (dispatch) => {
//   try {
//     const response = await updateContactApi(contactId, contactData);
//     dispatch(updateContactSuccess({ id: contactId, data: response }));
//   } catch (error) {
//     dispatch(loginUserError(error.message));
//   }
// };

// export default authSlice.reducer;
