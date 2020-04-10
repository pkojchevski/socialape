import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

import CommentForm from "./CommentForm";
import Comments from "./Comments";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0, 0.1)",
    marginBottom: 20
  }
};
const ScreamDialog = ({
  classes,
  openDialog,
  screamIdFromParrent,
  scream: {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments
  },
  getScream,
  UI: { loading }
}) => {
  const [open, setOpen] = useState(false);

  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);
  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setOpen(true);
    getScream(screamIdFromParrent);
    setOldPath(oldPath);
    setNewPath(newPath);
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount}</span>
      </Grid>
      <CommentForm screamId={screamId} />
      <hr className={classes.visibleSeparator} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  // clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamIdFromParrent: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = dispatch => ({
  getScream: screamId => dispatch(actions.getScream(screamId))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
