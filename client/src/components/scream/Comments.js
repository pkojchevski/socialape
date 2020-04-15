import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ProfileComment_1 from '../profile/ProfileComment_1'

const styles = {
  commentImage: {
    maxWidth: "30%",
    height: 50,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
};
const Comments = ({ comments, classes }) => {
  return (
    <Grid container xs={12}>
      {comments
        && comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <ProfileComment_1
                userImage={userImage}
                userHandle={userHandle}
                createdAt={createdAt}
                body={body}
              />
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })
      }
    </Grid>
  );
};

export default withStyles(styles)(Comments);
