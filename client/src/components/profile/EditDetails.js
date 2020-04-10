import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useInput } from "../../hooks/useInput.hooks";
import MyButton from "../../util/MyButton";

const styles = theme => ({
  button: {
    float: "right"
  }
});
const EditDetails = ({ credentials, editUserDetails, classes }) => {
  const { value: bio, bind: bindBio, reset: resetBio } = useInput(
    credentials.bio ? credentials.bio : ""
  );
  const { value: website, bind: bindWebsite, reset: resetWebsite } = useInput(
    credentials.website ? credentials.website : ""
  );
  const {
    value: location,
    bind: bindLocation,
    reset: resetLocation
  } = useInput(credentials.location ? credentials.location : "");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    editUserDetails(userDetails);
    handleClose();
  };
  return (
    <Fragment>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              {...bindBio}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={website}
              {...bindWebsite}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your location"
              className={classes.textField}
              value={location}
              {...bindLocation}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

const mapActionToProps = dispatch => ({
  editUserDetails: userDetails => dispatch(actions.editUserDetails(userDetails))
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditDetails));
