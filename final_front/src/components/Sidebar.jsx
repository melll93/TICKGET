import React from "react";
import HomeButton from "./sidebar/HomeButton";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <HomeButton />
      <Profile />
      <PersonalTabs />
      <MenuList />
    </div>
  );
};

export default Sidebar;
