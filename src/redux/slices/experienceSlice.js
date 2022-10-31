import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ExperienceService from "../services/experience.service";

const slice = createSlice({
  name: "experienceSlice",
  initialState: {
    experienceList: [],
    editableExperience: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    requestStartedAction: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    requestFailedAction: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    getExperienceListSuccessAction: (state, action) => {
      state.experienceList = [];
      state.experienceList = action.payload;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getExperienceListSuccessAction,
} = slice.actions;

export function fetchExperienceThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await ExperienceService.getExperienceList();
      dispatch(getExperienceListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
