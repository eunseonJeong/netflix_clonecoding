import { configureStore } from "@reduxjs/toolkit";
import auth from "../modules/authSlice";
import profile from "../modules/profileSlice";
import modalSlice from "../modules/modalSlice";

const store = configureStore({
  reducer: {
    auth,
    profile,
    modalSlice,
  },
});

export default store;
