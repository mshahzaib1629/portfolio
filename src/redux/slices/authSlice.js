import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "authSlice",
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
    loginSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { requestStartedAction, requestFailedAction, loginSuccessAction } =
  slice.actions;

export function loginThunk(email, password) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      await AuthService.login(email, password);
      dispatch(loginSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
