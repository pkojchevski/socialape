import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MyButton from "../../util/MyButton";
import Notifications from "./Notifications";

//mui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotificationsIcon from "@material-ui/icons/Notifications";

// icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

import PostScream from "../scream/PostScream";

const Navbar = ({ auth, imageUrl, loading, openDrawerHandle }) => {
  return (
    <AppBar>
      <Toolbar className="nav-container" style={{ width: "inherit" }}>
        {auth ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
            {loading ? (
              <CircularProgress
                style={{ position: "absolute", right: "10%" }}
                size={30}
              />
            ) : (
                <div style={{ position: "absolute", right: "10%" }}>
                  <MyButton tip="Profile" onClick={openDrawerHandle}>
                    <img
                      src={imageUrl}
                      width={30}
                      height={30}
                      alt="profile img"
                    />
                  </MyButton>
                </div>
              )}
          </Fragment>
        ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
            </Button>
              <Button color="inherit" component={Link} to="/home">
                Home
            </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
            </Button>
            </Fragment>
          )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  auth: state.user.authenticated,
  imageUrl: state.user.credentials.imageUrl,
  loading: state.user.loading
});

export default connect(mapStateToProps)(Navbar);
