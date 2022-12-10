import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import SkillSetService from "../services/skillSet.service";

const initialState = {
  skillSetList: [],
  editableSkillSetId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "skillSetSlice",
  initialState,
  reducers: {
    requestStartedAction: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    requestFailedAction: (state, action) => {
      // state.error = action.payload;
      state.isLoading = false;
    },
    getSkillSetListSuccessAction: (state, action) => {
      state.skillSetList = [];
      state.skillSetList = action.payload;
      state.isLoading = false;
    },
    addNewSkillSetSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    setEditableSkillSetAction: (state, action) => {
      state.editableSkillSetId = action.payload?.skillSetId;
    },
    editSkillSetSuccessAction: (state, action) => {
      state.editableSkillSetId = null;
      state.isLoading = false;
    },
    updateSortingSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    deleteSkillSetSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getSkillSetListSuccessAction,
  addNewSkillSetSuccessAction,
  setEditableSkillSetAction,
  editSkillSetSuccessAction,
  updateSortingSuccessAction,
  deleteSkillSetSuccessAction,
} = slice.actions;

export function fetchSkillSetThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await SkillSetService.getSkillSetList();
      dispatch(getSkillSetListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function addNewSkillSetThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await SkillSetService.addNewSkillSet(data);
      dispatch(addNewSkillSetSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editSkillSetThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await SkillSetService.updateSkillSet(data);
      dispatch(editSkillSetSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function updateSortingThunk(item1, item2) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await SkillSetService.updateSorting(
        item1,
        item2
      );
      dispatch(updateSortingSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteSkillSetThunk(skillSet) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await SkillSetService.deleteSkillSet(skillSet);
      dispatch(deleteSkillSetSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
