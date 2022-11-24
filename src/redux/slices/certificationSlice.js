import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import CertificationService from "../services/certification.service";

const initialState = {
  certificationList: [],
  editableCertificationId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "certificationSlice",
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
    getCertificationListSuccessAction: (state, action) => {
      state.certificationList = [];
      state.certificationList = action.payload;
      state.isLoading = false;
    },
    addNewCertificationSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    setEditableCertificationAction: (state, action) => {
      state.editableCertificationId = action.payload?.certificationId;
    },
    editCertificationSuccessAction: (state, action) => {
      state.editableCertificationId = null;
      state.isLoading = false;
    },
    updateCertificationSortingSuccessAction: (state, action) => {
      state.isLoading = false;
    },
    deleteCertificationSuccessAction: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getCertificationListSuccessAction,
  addNewCertificationSuccessAction,
  setEditableCertificationAction,
  editCertificationSuccessAction,
  updateCertificationSortingSuccessAction,
  deleteCertificationSuccessAction,
} = slice.actions;

export function fetchCertificationThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await CertificationService.getCertificationList();
      dispatch(getCertificationListSuccessAction(response));
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function addNewCertificationThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.addNewCertification(data);
      dispatch(addNewCertificationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function editCertificationThunk(data) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.updateCertification(data);
      dispatch(editCertificationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function updateImageThunk(previousImageUrl, newImageFile) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      const imageUrl = await CertificationService.updateImage(
        previousImageUrl,
        newImageFile
      );
      return imageUrl;
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function updateCertificationSortingThunk(certificate1, certificate2) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.updateCertificationSorting(
        certificate1,
        certificate2
      );
      dispatch(updateCertificationSortingSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteCertificationThunk(id) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.deleteCertification(id);
      dispatch(deleteCertificationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
