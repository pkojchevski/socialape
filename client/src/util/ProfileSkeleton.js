import React from "react";

import NoImg from "../assets/images/no-img.png";
import theme from "../util/theme";

//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
//icons
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0, 0.6)",
    width: "100%",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0, 0.6)",
    width: "50%",
    marginBottom: 10
  }
});
const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span>Location</span>
          <hr />
          <LocationOn color="primary" />
          <span>https://website.com</span>
          <hr />
          <CalendarToday color="primary" />
          Joined date
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileSkeleton);
