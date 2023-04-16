import React, { useEffect, useState } from "react";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";
import SearchBar from "./header/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState();
  const [buttonIcon, setButtonIcon] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const path = window.location.pathname;

  const setDefault = () => {
    if (path === "/") {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const handleSidebar = () => {
    if (isVisible) { // 보여줄 때
      setSidebar(225)
      setButtonIcon("bi bi-caret-left-fill")
    } else { // 숨길 때
      setSidebar(0)
      setButtonIcon("bi bi-caret-right-fill")
    }
  }

  const handleClick = () => {
    if (isVisible) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    handleSidebar()
  }, [isVisible])

  useEffect(() => {
    setDefault()
  }, [path])

  return (
    <>
      <div className="sidebar container" style={{ width: sidebar + 25 }}>
        <div className="sidebar items" style={{ width: sidebar }}>
          <Profile />
          <PersonalTabs />
          <MenuList />
          <SearchBar />
        </div>
        <div className="sidebar button" style={{ width: 25, left: sidebar }}>
          <div style={{ transform: "translate(0, 50%)" }}>
            <i className={buttonIcon} style={{ fontSize: 20, color: "white" }} onClick={handleClick}></i>
          </div>
        </div>
      </div >
    </>
  );
};

export default Sidebar;
