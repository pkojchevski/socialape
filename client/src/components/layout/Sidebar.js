import React from "react";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";

import MyButton from "../../util/MyButton";
import Profile from "../profile/Profile";

function Sidebar({ openDrawer, closeDrawer }) {
  return (
    <Drawer anchor="left" open={openDrawer} onClose={closeDrawer}>
      <div className="drawer-header"></div>
      <MyButton
        tip="close"
        onClick={closeDrawer}
      >
        <ChevronLeftIcon />
      </MyButton>
      <Profile />
    </Drawer>
  );
}

export default Sidebar;
