import React, { Fragment } from 'react'

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    avatarImage: {
        height: 50,
        width: 50,
        border: '50%'

    }
})
function ProfileComment_1({ userImage, userHandle, body, createdAt }) {
    const classes = useStyles()
    return (
        <Grid container spacing={0} xs={12}>
            <Grid
                spacing={0}
                xs={3}>
                <Avatar src={userImage} alt="Profile" className={classes.avatarImage} />
            </Grid>
            <Grid xs={9}>
                <Grid container alignContent='center'
                    alignItems='center'
                    justify='space-between'>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h6"
                        to={`users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("MMMM DD YYYY")}
                    </Typography>
                </Grid>
                <Typography variant="body1">{body}</Typography>
            </Grid >
        </Grid >
    )
}

ProfileComment_1.propTypes = {
    userImage: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}



export default ProfileComment_1
