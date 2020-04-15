import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import * as actions from "../../redux/actions/index";

import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";
import EditDetails from "./EditDetails";
import theme from "../../util/theme";
const styles = {
  elevation0: {
    background: "transparent",
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      borderRadius: "50%",

      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
        boxShadow: "2px 2px 5px 0px rgba(50, 50, 50, 0.75)",
        backgroundColor: "#fff",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      border: "3px solid #fff",
      boxShadow: "0px 0px 11px 0px rgba(50, 50, 50, 0.75)",
    },
    "& .profile-details": {
      textAlign: "center",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  logout_wrapper: {
    position: "absolute",
    bottom: "0",
    margin: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    "& .logout_text": {
      color: " #fff",
      fontWeight: "bolder",
    },
  },
};

const Profile = ({
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
  uploadImage,
  logoutUser,
}) => {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    logoutUser();
  };
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper classes={{ elevation0: classes.elevation0 }} elevation={0}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <form>
              <img
                src={
                  "https://kprofiles.com/wp-content/uploads/2019/11/D6aGkQlUcAAgf_n-533x800.jpg"
                }
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
                type="submit"
              >
                <EditIcon color="primary" />
              </MyButton>
            </form>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            <hr />
            {location && (
              <div>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </div>
            )}
          </div>
          <div className={classes.logout_wrapper}>
            <MyButton tip="Logout" onClick={handleLogout}>
              {/* <KeyboardReturn color="primary" /> */}
              <Typography className="logout_text">LOGOUT</Typography>
            </MyButton>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper} elevation={0}>
        <Typography variant="body2" align="center">
          No profile found, please login again.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
  loading: state.user.loading,
});

const mapActionToProps = (dispatch) => ({
  logoutUser: () => dispatch(actions.logoutUser()),
  uploadImage: (imgData) => dispatch(actions.uploadImage(imgData)),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile));
