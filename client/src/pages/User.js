import React, { useEffect, useState } from "react";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Grid from "@material-ui/core/Grid";
import * as actions from "../redux/actions/index";
import StaticProfile from "../components/profile/StaticProfile";
import { connect } from "react-redux";
import ProfileSkeleton from "../util/ProfileSkeleton";

const User = ({ data: { screams, loading }, getUserData, match }) => {
  const [profile, setProfile] = useState("");
  const [screamIdParam, setScreamIdParam] = useState("");

  const useEffect =
    (() => {
      const handle = match.params.handle;
      const screamId = match.params.screamId;
      if (screamId) {
        setScreamIdParam(screamId);
      }
      getUserData(handle);
      axios
        .get(`/user/${handle}`)
        .then(res => {
          setProfile(res.data.user);
        })
        .catch(err => console.log(err));
    },
    []);

  const screamsMarkup = loading ? (
    <ProfileSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      else return <Scream key={scream.screamId} scream={scream} />;
    })
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      {/* <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid> */}
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = dispatch => ({
  getUserData: () => dispatch(actions.getUserData())
});

export default connect(mapStateToProps, mapActionsToProps)(User);
