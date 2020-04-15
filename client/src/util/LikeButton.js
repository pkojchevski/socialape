import React from "react";

import MyButton from "./MyButton.js";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

//redux
import { connect } from "react-redux";

const LikeButton = ({
  onLikeScream,
  onUnlikeScream,
  user: { authenticated, likes },
  screamId
}) => {
  const likedScream = () => {
    if (likes && likes.find(like => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };
  dayjs.extend(relativeTime);

  const likeScream = () => {
    onLikeScream(screamId);
  };

  const unlikeScream = () => {
    onUnlikeScream(screamId);
  };

  return !authenticated ? (
    <Link to="login">
      <MyButton tip="Like"></MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
        <MyButton tip="like" onClick={likeScream}>
          <FavoriteBorderIcon color="primary" />
        </MyButton>
      );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = dispatch => ({
  onLikeScream: streamId => dispatch(actions.likeScream(streamId)),
  onUnlikeScream: streamId => dispatch(actions.unlikeScream(streamId))
});

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
