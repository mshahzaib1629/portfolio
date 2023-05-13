import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import CertificationService from "../services/certification.service";

const initialState = {
  certificationList: [],
  editableCertificationId: null,
  isLoading: false,
  totalCertificates: 0,
  page: 0,
  cursorIds: {},
  pageSize: 10,
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
      const { data, cursorIds, page, totalCount } = action.payload;
      state.certificationList = [];
      state.certificationList = data;
      state.cursorIds = cursorIds;

      state.page = page;
      state.totalCertificates = totalCount;
      state.isLoading = false;
    },
    getFeaturedCertificationListSuccessAction: (state, action) => {
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
    resetCertificationAction: (state, action) => {
      state.editableCertificationId = null;
      state.certificationList = [];
      state.totalCertificates = 0;
      state.page = 0;
      state.cursorIds = {};
    },
    changePageSizeAction: (state, action) => {
      state.pageSize = action.payload;
      state.page = 0;
      state.cursorIds = {};
      state.totalCertificates = 0;
      state.certificationList = [];
    },
  },
});

export const {
  requestStartedAction,
  requestFailedAction,
  getCertificationListSuccessAction,
  getFeaturedCertificationListSuccessAction,
  addNewCertificationSuccessAction,
  setEditableCertificationAction,
  editCertificationSuccessAction,
  updateSortingSuccessAction,
  deleteCertificationSuccessAction,
  resetCertificationAction,
  changePageSizeAction,
} = slice.actions;

export function fetchCertificationThunk(pageDirection) {
  return async (dispatch, getState) => {
    dispatch(requestStartedAction());
    let response;
    try {
      const { cursorIds, page, pageSize } = getState().certification;

      response = await CertificationService.getCertificationList(
        cursorIds,
        pageSize,
        pageDirection,
        page
      );
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
      dispatch(getFeaturedCertificationListSuccessAction(response));
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
