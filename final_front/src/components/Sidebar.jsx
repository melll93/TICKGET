import React, { useEffect, useState } from "react";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";
import SearchBar from "./header/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(225);
  const [isVisible, setIsVisible] = useState();
  const [buttonIcon, setButtonIcon] = useState("bi bi-caret-right-fill");
  const path = window.location.pathname;

  const setDefault = () => {
    if (path === "/") {
      setSidebar(225)
      setIsVisible(true)
    } else {
      setSidebar(0)
      setIsVisible(false)
    }
  }

  const handleSidebar = (boolean) => {
    if (isVisible) {
      setSidebar(225)
    } else {

    }
  }

  const openSidebar = () => {
    setSidebar(225);
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
      <div className="sidebar container" style={{ width: sidebar + 25 }}>
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
        <div className="sidebar button" style={{ width: 25, left: sidebar }}>
          <i className={buttonIcon} style={{ fontSize: 20, color: "white" }} onClick={openSidebar}></i>
        </div>
      </div >
    </>
  );
};

export default Sidebar;
