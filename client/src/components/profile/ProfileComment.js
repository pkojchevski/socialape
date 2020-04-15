import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "../../util/LikeButton";

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    avatarImage: {
        width: 60,
        height: 60
    },
    invisibleSeparator: {
        border: "none",
        margin: 4
    },
})
export const ProfileComment = ({ scream
    : { userImage, userHandle, body, screamId, createdAt, likeCount } }) => {
    const classes = useStyles();
    return (
        <Grid container xs={12}>
            <Grid item xs={4}>
                <Avatar src={userImage} alt="Profile" className={classes.avatarImage} />
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount}</span>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComment)

