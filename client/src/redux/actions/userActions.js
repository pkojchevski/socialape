import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  GET_SINGLE_USER,
  OPEN_DRAWER,
  CLOSE_DRAWER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("expTime");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
    })
    .catch(err => {
      console.error("err:", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const openDrawerAction = () => ({ action: OPEN_DRAWER });
export const closeDrawerAction = () => ({ action: CLOSE_DRAWER });

const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  console.log(userDetails);
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  console.log(formData)
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const getSingleUser = userHandle => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post("/notifications", notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};
