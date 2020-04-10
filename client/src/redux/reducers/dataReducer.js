import {
  SET_SCREAMS,
  SET_SCREAM,
  POST_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};
export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          scream => scream.screamId !== action.payload
        )
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
};
