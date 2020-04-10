import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  OPEN_DRAWER,
  CLOSE_DRAWER
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  openDrawer: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case OPEN_DRAWER:
      return {
        ...state,
        openDrawer: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        openDrawer: false
      };
    default:
      return state;
  }
};
