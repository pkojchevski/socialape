import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// mui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
//icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
//redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

const Notifications = ({ markNotificationsRead, notifications }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  dayjs.extend(relativeTime);
  const handleOpen = event => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);

    markNotificationsRead(unreadNotificationsIds);
  };
  let notificationsIcon = "";
  console.log("notifications:", notifications);
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(not => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }
  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === "like" ? "liked" : "comment";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              // color="default"
              variant="body1"
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="Notificatons">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

const mapActionsToProps = dispatch => ({
  markNotificationsRead: id => dispatch(actions.markNotificationsRead(id))
});
export default connect(mapStateToProps, mapActionsToProps)(Notifications);
