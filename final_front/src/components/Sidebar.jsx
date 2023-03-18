import React from "react";
import { Link } from "react-router-dom";
import HomeButton from "./Sidebar/HomeButton";
import MenuList from "./Sidebar/MenuList";
import PersonalTabs from "./Sidebar/PersonalTabs";
import Profile from "./Sidebar/Profile";

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
