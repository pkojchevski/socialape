import React, { useState, useEffect } from "react";

import * as actions from "../../redux/actions/index";

// mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

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
    submitComment(screamId, body);
  };
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {
  submitComment: actions.submitComment
})(withStyles(styles)(CommentForm));
