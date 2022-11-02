import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProfileService from "../services/profile.service";

const initialState = {
  about: null,
  social: null,
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
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
} = slice.actions;

export function fetchAboutThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
    //   response = await ProfileService.getProfileList();
    //   dispatch(getProfileListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editAboutThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
    //   await ProfileService.updateProfile(data);
    //   dispatch(editProfileSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}


export function fetchSocialThunk() {
    return async (dispatch, getState) => {
      dispatch(requestStartedAction());
      let response;
      try {
      //   response = await ProfileService.getProfileList();
      //   dispatch(getProfileListSuccessAction(response));
      } catch (error) {
        dispatch(requestFailedAction(error));
        throw error;
      }
    };
  }
  
  export function editSocialThunk(data) {
    return async (dispatch, getState) => {
      dispatch(requestStartedAction());
      try {
      //   await ProfileService.updateProfile(data);
      //   dispatch(editProfileSuccessAction());
      } catch (error) {
        dispatch(requestFailedAction(error));
        throw error;
      }
    };
  }

export default slice.reducer;
