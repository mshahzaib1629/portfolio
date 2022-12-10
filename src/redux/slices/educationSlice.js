import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import EducationService from "../services/education.service";

const initialState = {
  educationList: [],
  editableEducationId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "educationSlice",
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
    getEducationListSuccessAction: (state, action) => {
      state.educationList = [];
      state.educationList = action.payload;
      state.isLoading = false;
    },
    addNewEducationSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    setEditableEducationAction: (state, action) => {
      state.editableEducationId = action.payload?.educationId;
    },
    editEducationSuccessAction: (state, action) => {
      state.editableEducationId = null;
      state.isLoading = false;
    },
    deleteEducationSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getEducationListSuccessAction,
  addNewEducationSuccessAction,
  setEditableEducationAction,
  editEducationSuccessAction,
  deleteEducationSuccessAction,
} = slice.actions;

export function fetchEducationThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await EducationService.getEducationList();
      dispatch(getEducationListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function addNewEducationThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await EducationService.addNewEducation(data);
      dispatch(addNewEducationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editEducationThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await EducationService.updateEducation(data);
      dispatch(editEducationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteEducationThunk(education) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await EducationService.deleteEducation(education);
      dispatch(deleteEducationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
