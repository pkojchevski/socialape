import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import MyButton from "../../util/MyButton";

const styles = {
  submitButton: {
    position: "relative",
    marginTop: 20
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "85%",
    top: "0%"
  }
};

const PostScream = ({ classes, postScream, clearErrors, UI }) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (UI.errors) {
      setError(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
      setOpen(false);
      setError(null);
    }
  }, [UI.errors, UI.loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    setOpen(false);
    setError(null);
  };

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    postScream({ body });
  };

  return (
    <Fragment>
      <MyButton
        tip="Post scream"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick="handleClose"
          btnClassName={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Make a SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream to your apes"
              className={classes.textField}
              value={body}
              onChange={handleChange}
              helperText={UI.errors ? UI.errors.body : null}
              error={UI.errors ? (UI.errors.body ? true : false) : false}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, {
  postScream: actions.postScream,
  clearErrors: actions.clearErrors
})(withStyles(styles)(PostScream));
