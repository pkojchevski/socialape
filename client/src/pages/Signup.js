import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Login from "../pages/Login";
import monkeyImg from "../assets/images/ape.png";
import * as actions from "../redux/actions/index";
import { connect } from "react-redux";
import { useInput } from "../hooks/useInput.hooks";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto",
    width: "50px",
    display: "block",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};
const Signup = ({ classes, history, onSignup, ui: { loading, errors } }) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: confirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
  } = useInput("");
  const { value: handle, bind: bindHandle, reset: resetHandle } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    onSignup(userData, history);

    // resetEmail();
    // resetPassword();
    // resetConfirmPassword();
    // resetHandle();
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid item sm>
        <img src={monkeyImg} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors ? errors.email : null}
            error={errors ? (errors.email ? true : false) : false}
            value={email}
            {...bindEmail}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors ? errors.password : null}
            error={errors ? (errors.password ? true : false) : false}
            className={classes.textField}
            value={password}
            {...bindPassword}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPasswor"
            type="password"
            label="Confirm Password"
            helperText={errors ? errors.confirmPassword : null}
            error={errors ? (errors.confirmPassword ? true : false) : false}
            className={classes.textField}
            value={confirmPassword}
            {...bindConfirmPassword}
            fullWidth
          />

          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            helperText={errors ? errors.handle : null}
            error={errors ? (errors.handle ? true : false) : false}
            className={classes.textField}
            value={handle}
            {...bindHandle}
            fullWidth
          />
          {errors && errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
  ui: PropTypes.object,
  onSignup: PropTypes.func,
  logoutUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.UI,
});

const mapActionsToProps = (dispatch) => ({
  onSignup: (userData, history) =>
    dispatch(actions.signupUser(userData, history)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
