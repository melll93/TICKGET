import React, { useEffect, useState } from "react";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";
import SearchBar from "./header/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(240);
  const [isVisible, setIsVisible] = useState();
  const path = window.location.pathname;

  const setDefault = () => {
    if (path === "/") {
      setSidebar(240)
      setIsVisible(true)
    } else {
      setSidebar(0)
      setIsVisible(false)
    }
  }

  const handleSidebar = (boolean) => {
    if (isVisible) {
      setSidebar(240)
    } else {

    }
  }

  const openSidebar = () => {
    setSidebar(240);
    // setIsVisible(0);
  };
  const closeSidebar = () => {
    setSidebar(0);
    // setIsVisible(40);
  };

  useEffect(() => {
    setDefault()
  }, [path])

  return (
    <>
      <div className="sidebar container" style={{ width: sidebar + 40 }}>
        <div className="sidebar items" style={{ width: sidebar }}>
          <img
            src="../logos/XBTN.png"
            className="closebtn"
            onClick={closeSidebar}
            alt="x버튼"
            style={{ width: "40px" }}
          />
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
            style={{ width: "40px", left: "240px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
