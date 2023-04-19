import React, { useEffect, useState } from "react";
import MenuList from "./sidebar/MenuList";
import PersonalTabs from "./sidebar/PersonalTabs";
import Profile from "./sidebar/Profile";
import SearchBar from "./header/SearchBar";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState({
    size: 0,
    buttonIcon: "bi bi-caret-right-fill",
  });

  const [isVisible, setIsVisible] = useState(true);

  const path = window.location.pathname;

  const setDefault = () => {
    if (path === "/") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleSidebar = () => {
    if (isVisible) {
      // 보여줄 때
      setSidebar({ size: 225, buttonIcon: "bi bi-caret-left-fill" });
    } else {
      // 숨길 때
      setSidebar({ size: 0, buttonIcon: "bi bi-caret-right-fill" });
    }
  };

  const handleClick = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    handleSidebar();
  }, [isVisible]);

  useEffect(() => {
    setDefault();
  }, [path]);

  return (
    <>
      <div className="sidebar container" style={{ width: sidebar.size + 25 }}>
        <div className="sidebar items" style={{ width: sidebar.size }}>
          <Profile />
          <PersonalTabs />
          <MenuList />
        </div>
        <div
          className="sidebar button"
          style={{ width: 25, left: sidebar.size }}
        >
          <div style={{ transform: "translate(0, 50%)" }}>
            <i
              className={sidebar.buttonIcon}
              style={{ fontSize: 20, color: "white" }}
              onClick={() => handleClick()}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
