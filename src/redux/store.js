import { configureStore } from "@reduxjs/toolkit";
import experienceReducer from "./slices/experienceSlice";
import authReducer from "./slices/authSlice";
import certificationReducer from "./slices/certificationSlice";
import educationReducer from "./slices/educationSlice";
import projectReducer from "./slices/projectSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    experience: experienceReducer,
    auth: authReducer,
    certification: certificationReducer,
    educaiton: educationReducer,
    project: projectReducer,
    profile: profileReducer,
  },
});

export default store;
