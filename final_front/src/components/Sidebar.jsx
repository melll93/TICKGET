import React, { useState } from "react";
import MenuList from "./Sidebar/MenuList";
import PersonalTabs from "./Sidebar/PersonalTabs";
import Profile from "./Sidebar/Profile";
import SearchBar from "./Gnb/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(300);
  const [isVisible, setIsVisible] = useState("visible");
  const openSidebar = () => {
    setSidebar(300);
    setIsVisible("hidden");
  };
  const closeSidebar = () => {
    setSidebar(0);
    setIsVisible("visible");
  };

  return (
    <>
      {/* <div>
        <img
          src="../logos/MENUBAR.png"
          className="openSidebarButton"
          onClick={openSidebar}
          alt="sidebarbtn"
          style={{ width: "40px" }}
        ></img>
      </div> */}

      <div className="sidebar container" style={{ width: sidebar }}>
        <div className="sidebar items" style={{ width: sidebar }}>
          <img
            src="../logos/XBTN.png"
            className="closebtn"
            onClick={closeSidebar}
            alt="x버튼"
            style={{ width: "40px" }}
          ></img>
          <Profile />
          <PersonalTabs />
          <MenuList />
          <SearchBar />
        </div>
        <div className="sidebar button">
          <img
            src="../logos/MENUBAR.png"
            className="openSidebarButton"
            onClick={openSidebar}
            alt="sidebarbtn"
            style={{ width: "40px", visibility: isVisible }}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
