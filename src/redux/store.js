import { configureStore } from "@reduxjs/toolkit";
import experienceReducer from "./slices/experienceSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    experience: experienceReducer,
    auth: authReducer,
  },
});

export default store;
