import React, { useState, useEffect } from "react";

import * as actions from "../../redux/actions/index";

import PropTypes from "prop-types";
// mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import AddCircleIcon from '@material-ui/icons/AddCircle';

// react
import { connect } from "react-redux";

const styles = {
  textField: {
    margin: "10px auto 10px auto"
  }
};

const CommentForm = ({
  classes,
  authenticated,
  UI,
  submitComment,
  screamId
}) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
    }
  }, [UI.errors, UI.loading]);

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    submitComment(screamId, { body });
  };
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid sm={10}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors ? (errors.comment ? true : false) : false}
            helperText={errors ? errors.comment : null}
            value={body}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>
        <Grid sm={2}>
          <MyButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            >
        </MyButton>
        </Grid>
      </form>
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  screamId: PropTypes.string
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapActionsToProps = dispatch => ({
  submitComment: (screamId, comment) => dispatch(actions.submitComment(screamId, comment))
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
