import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import * as actions from "../redux/actions/index";

import { useInput } from "../hooks/useInput.hooks";
import monkeyImg from "../assets/images/ape.png";

const styles = {
  form: {
    textAlign: "center",
    padding: "0 20px"
  },
  image: {
    margin: "20px auto 20px auto",
    width: 50
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};
const Login = ({ classes, history, UI: { loading, errors }, onLogin }) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput("");

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    onLogin(userData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={monkeyImg} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            {...bindPassword}
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
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <br />
          <small>
            Don't have an account? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = dispatch => ({
  onLogin: (userData, history) => dispatch(actions.loginUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
