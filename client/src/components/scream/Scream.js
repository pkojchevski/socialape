import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Mui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import LikeButton from "../../util/LikeButton";

import withStyles from "@material-ui/core/styles/withStyles";

import * as actions from "../../redux/actions/index";
import MyButton from "../../util/MyButton";
import ScreamDialog from "./ScreamDialog";
import DeleteScream from "./DeleteScream";

//icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: "50%"

  },
  content: {
    padding: 20,
    objectFit: "cover"
  }
};

const Scream = ({
  classes,
  scream,
  onLikeScream,
  onUnlikeScream,
  user: {
    authenticated,
    credentials: { handle }
  }
}) => {
  const deleteButton =
    authenticated && scream.userHandle === handle ? (
      <DeleteScream screamId={scream.screamId} />
    ) : null;
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={scream.userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={scream.screamId} />
        <span>{scream.likeCount ? scream.likeCount : 0}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount ? scream.commentCount : 0}</span>
        <span>
          <ScreamDialog
            screamId={scream.screamId}
            userHandle={scream.userHandle}
            openDialog={false}
          />
        </span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = dispatch => ({
  onLikeScream: () => dispatch(actions.likeScream),
  onUnlikeScream: () => dispatch(actions.unlikeScream)
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
