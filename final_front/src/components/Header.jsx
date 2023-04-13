import React from "react";
import HeaderSearchBar from "./Gnb/HeaderSearchBar";
import HomeButton from "./Sidebar/HomeButton";

const Header = () => {
  return (
    <div className="Gnb">
      <HomeButton />
      <HeaderSearchBar />
    </div>
  );
};

export default Header;
