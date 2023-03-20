import React from "react";
import HomeButton from "./Sidebar/HomeButton";
import MenuList from "./Sidebar/MenuList";
import PersonalTabs from "./Sidebar/PersonalTabs";
import Profile from "./Sidebar/Profile";

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
