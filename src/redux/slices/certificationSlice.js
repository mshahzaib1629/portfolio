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
      // state.error = action.payload;
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
    updateSortingSuccessAction: (state, action) => {
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
  updateSortingSuccessAction,
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

export function fetchFeaturedCertificationThunk() {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      response = await CertificationService.getFeaturedCertificationList();
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

export function deleteImageThunk(imageRef) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.deleteImage(imageRef);
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
      const imageUrl = await CertificationService.updateImage(
        previousImageRef,
        newImageFile
      );
      return imageUrl;
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
      await CertificationService.updateSorting(item1, item2);
      dispatch(updateSortingSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export function deleteCertificationThunk(certification) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    try {
      await CertificationService.deleteCertification(certification);
      dispatch(deleteCertificationSuccessAction());
    } catch (error) {
      dispatch(requestFailedAction(error));
      throw error;
    }
  };
}

export default slice.reducer;
