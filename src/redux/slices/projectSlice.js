import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProjectService from "../services/project.service";

const initialState = {
  projectList: [],
  editableProjectId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "projectSlice",
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
    getProjectListSuccessAction: (state, action) => {
      state.projectList = [];
      state.projectList = action.payload;
      state.isLoading = false;
    },
    addNewProjectSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    setEditableProjectAction: (state, action) => {
      state.editableProjectId = action.payload.projectId;
    },
    editProjectSuccessAction: (state, action) => {
      state.editableProjectId = null;
      state.isLoading = false;
    },
    deleteProjectSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getProjectListSuccessAction,
  addNewProjectSuccessAction,
  setEditableProjectAction,
  editProjectSuccessAction,
  deleteProjectSuccessAction,
} = slice.actions;

export function fetchProjectThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await ProjectService.getProjectList();
      dispatch(getProjectListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function addNewProjectThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProjectService.addNewProject(data);
      dispatch(addNewProjectSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editProjectThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProjectService.updateProject(data);
      dispatch(editProjectSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteProjectThunk(id) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProjectService.deleteProject(id);
      dispatch(deleteProjectSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;