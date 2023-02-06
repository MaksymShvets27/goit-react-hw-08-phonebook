import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState } from './contacts.init-state';
import {
  contactsAsyncThunk,
  addContactAsyncThunk,
  deleteContactAsyncThunk,
} from './contacts.thunk';

const handlePending = state => {
  state.contacts.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [contactsAsyncThunk.pending]: handlePending,
    [contactsAsyncThunk.fulfilled]: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = payload;
    },
    [contactsAsyncThunk.rejected]: handleRejected,
    [addContactAsyncThunk.pending]: handlePending,
    [addContactAsyncThunk.fulfilled]: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(payload);
    },
    [addContactAsyncThunk.rejected]: handleRejected,
    [deleteContactAsyncThunk.pending]: handlePending,
    [deleteContactAsyncThunk.fulfilled]: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      let index = state.contacts.items.findIndex(
        task => task.id === payload.id
      );
      state.contacts.items.splice(index, 1);
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== payload
      );
    },
    [deleteContactAsyncThunk.rejected]: handleRejected,
  },
});

export default contactsSlice.reducer;
