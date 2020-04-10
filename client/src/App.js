import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AuthRoute from "./util/AuthRoute";
import { connect } from "react-redux";
import * as actions from "./redux/actions/index";
import User from "./pages/User";
import themeObject from "./util/theme";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import axios from "axios";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://europe-west1-socialape-4e15e.cloudfunctions.net/api";

const token = localStorage.token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(actions.logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(actions.getUserData());
  }
}

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const openDrawerHandle = () => {
    setOpenDrawer(true);
  };
  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Navbar openDrawerHandle={openDrawerHandle} />
        <Sidebar openDrawer={openDrawer} closeDrawer={closeDrawerHandler} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <AuthRoute path="/login" component={Login}></AuthRoute>
            <AuthRoute path="/signup" component={Signup}></AuthRoute>
            <Route exact path="/users/:handle" component={User} />
            <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={User}
            />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization
});

const mapActionsToProps = dispatch => ({});

export default connect(mapStateToProps, mapActionsToProps)(App);
