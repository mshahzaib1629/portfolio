import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ExperienceService from "../services/experience.service";

const initialState = {
  experienceList: [],
  editableExperienceId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "experienceSlice",
  initialState,
  reducers: {
    requestStartedAction: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    requestFailedAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getExperienceListSuccessAction: (state, action) => {
      state.experienceList = [];
      state.experienceList = action.payload;
      state.isLoading = false;
    },
    addNewExperienceSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    setEditableExperienceAction: (state, action) => {
      state.editableExperienceId = action.payload.experienceId;
    },
    editExperienceSuccessAction: (state, action) => {
      state.editableExperienceId = null;
      state.isLoading = false;
    },
    deleteExperienceSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getExperienceListSuccessAction,
  addNewExperienceSuccessAction,
  setEditableExperienceAction,
  editExperienceSuccessAction,
  deleteExperienceSuccessAction,
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

export function addNewExperienceThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ExperienceService.addNewExperience(data);
      dispatch(addNewExperienceSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editExperienceThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ExperienceService.updateExperience(data);
      dispatch(editExperienceSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteExperienceThunk(id) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ExperienceService.deleteExperience(id);
      dispatch(deleteExperienceSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
