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

import LikeButton from "./LikeButton";

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
  scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount
  },
  onLikeScream,
  onUnlikeScream,
  user: {
    authenticated,
    credentials: { handle }
  }
}) => {
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount ? likeCount : 0}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount ? commentCount : 0}</span>
        <span>
          <ScreamDialog
            screamIdFromParrent={screamId}
            userHandle={userHandle}
            openDialog={false}
          />
        </span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
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
