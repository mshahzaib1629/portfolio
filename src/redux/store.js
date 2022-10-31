import { configureStore } from "@reduxjs/toolkit";
import experienceReducer from "./slices/experienceSlice";

const store = configureStore({
  reducer: {
    experience: experienceReducer,
  },
});

export default store;