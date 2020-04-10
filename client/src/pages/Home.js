import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Grid from "@material-ui/core/Grid";

import * as actions from "../redux/actions/index";

const Home = ({ data: { screams, loading }, getScreams }) => {
  useEffect(() => {
    getScreams();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <ScreamSkeleton />
        )}tart
        
      </Grid>
      {/* <Grid item sm={4} xs={12}>
        <Profile />
      </Grid> */}
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

const mapActionsToProps = dispatch => ({
  getScreams: () => dispatch(actions.getScreams())
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
