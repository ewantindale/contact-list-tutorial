import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const contactListSlice = createSlice({
  name: "contactList",
  initialState: {
    contacts: [],
    loading: false,
    error: "",
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push({
        ...action.payload,
      });
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    },
    fetchContactsStart: (state) => {
      state.loading = true;
    },
    fetchContactsSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
      state.error = "";
    },
    fetchContactsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  removeContact,
  updateContact,
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsError,
} = contactListSlice.actions;

export const fetchContactsAsync = () => async (dispatch) => {
  dispatch(fetchContactsStart());

  try {
    const response = await axios({
      method: "get",
      url: "/api/contacts",
    });

    dispatch(fetchContactsSuccess(response.data));
  } catch (error) {
    dispatch(fetchContactsError("could not fetch contacts"));
  }
};

export default contactListSlice.reducer;
