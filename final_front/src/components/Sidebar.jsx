import React, { useEffect, useState } from "react";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";
import SearchBar from "./header/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState("240");
  const [isVisible, setIsVisible] = useState(0);

  const path = window.location.pathname;

  const setDefault = () => {
    if (path === "/") {
      setSidebar(240)
      setIsVisible(0)
    } else {
      setSidebar(0)
      setIsVisible(40)
    }
  }

  const openSidebar = () => {
    setSidebar(240);
    setIsVisible(0);
  };
  const closeSidebar = () => {
    setSidebar(0);
    setIsVisible(40);
  };

  useEffect(() => {
    setDefault()
  }, [path])

  return (
    <>
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
            style={{ width: isVisible }}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
