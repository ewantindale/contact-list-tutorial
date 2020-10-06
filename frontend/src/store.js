import { configureStore } from "@reduxjs/toolkit";
import contactListReducer from "./contactListSlice";

const store = configureStore({
  reducer: {
    contactList: contactListReducer,
  },
});

export default store;
