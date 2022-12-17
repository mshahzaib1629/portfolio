import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProfileService from "../services/profile.service";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "profileSlice",
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
    getProfileSuccessAction: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    editProfileSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    resetProfileAction: (state, action) => {
      state.profile = null;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getProfileSuccessAction,
  editProfileSuccessAction,
  resetProfileAction,
} = slice.actions;

export function fetchProfileThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await ProfileService.getProfile();
      dispatch(getProfileSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editProfileThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProfileService.updateProfile(data);
      dispatch(editProfileSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteImageThunk(imageRef) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProfileService.deleteImage(imageRef);
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function updateImageThunk(previousImageRef, newImageFile) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      const uploadedImage = await ProfileService.updateImage(
        previousImageRef,
        newImageFile
      );
      return uploadedImage;
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteResumeThunk(resumeRef) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await ProfileService.deleteResume(resumeRef);
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function updateResumeThunk(previousResumeRef, newResumeFile) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      const uploadedResume = await ProfileService.updateResume(
        previousResumeRef,
        newResumeFile
      );
      return uploadedResume;
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
