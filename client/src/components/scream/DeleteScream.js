import React, { Fragment, useState } from "react";

import MyButton from "../../util/MyButton";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

const styles = {
  deleteButton: {
    left: "90%",
    position: "absolute",
    top: "10%"
  }
};
const DeleteScream = ({ classes, screamId, onDeleteScream }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    onDeleteScream(screamId);
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are You sure want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapActionsToProps = dispatch => ({
  onDeleteScream: screamId => dispatch(actions.deleteScream(screamId))
});

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteScream));
