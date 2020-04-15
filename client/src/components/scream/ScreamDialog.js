import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";


import CommentForm from "./CommentForm";
import Comments from "./Comments";

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'

// icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

import ProfileComment from '../profile/ProfileComment'

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
    padding: 20,
    position: 'relative'
  },
  closeButton: {
    position: "absolute",
    left: "85%"
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
  screamId,
  userHandle,
  getScream,
  scream,
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
    console.log('scream:', scream)
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setOpen(true);
    getScream(screamId)
    setOldPath(oldPath);
    setNewPath(newPath);
  };

  console.log(scream)

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} />
    </div>
  ) : (
      <Grid container >
        <hr className={classes.visibleSeparator} />
        {scream.comments && scream.comments.length > 0 ? <Comments comments={scream.comments} />
          :
          <Typography>There are no comments yet!</Typography>}

        <footer>
          <CommentForm screamId={scream.screamId} />
        </footer>
      </Grid >
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
        <DialogTitle>
          <ProfileComment scream={scream} />
        </DialogTitle>
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
  // userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object,
  UI: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  handleUser: PropTypes.string
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
