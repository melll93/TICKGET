import React, { useState } from "react";
import HomeButton from "./Sidebar/HomeButton";
import MenuList from "./Sidebar/MenuList";
import PersonalTabs from "./Sidebar/PersonalTabs";
import Profile from "./Sidebar/Profile";
import SearchBar from "./Gnb/SearchBar";
import "../styles/sidebar.css"

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(0);
  const openSidebar = () => {
    setSidebar(250);
  };
  const closeSidebar = () => {
    setSidebar(0);
  };
  return (
    <>
      <div>
        <img
          src="../logos/MENUBAR.png"
          className="openSidebarButton"
          onClick={openSidebar}
          alt="sidebarbtn"
          style={{ width: "40px" }}
        ></img>
      </div>
      <div className="Sidebar" style={{ width: sidebar }}>
        <img
          src="../logos/XBTN.png"
          className="closebtn"
          onClick={closeSidebar}
          alt="x버튼"
          style={{ width: "40px" }}
        ></img>

        <HomeButton />
        <Profile />
        <PersonalTabs />
        <MenuList />
        <SearchBar />
      </div>
    </>
  );
};

export default Sidebar;
