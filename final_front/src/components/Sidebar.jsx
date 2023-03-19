import React from "react";
import { Link } from "react-router-dom";
import HomeButton from "./sidebar/HomeButton";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to="/"><HomeButton /></Link>
      <Profile />
      <PersonalTabs />
      <MenuList />
    </div>
  );
};

export default Sidebar;
