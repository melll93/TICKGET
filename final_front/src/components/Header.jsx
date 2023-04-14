import React from "react";
import HeaderSearchBar from "./Gnb/HeaderSearchBar";
import HomeButton from "./Sidebar/HomeButton";
import SearchBar from "./Gnb/SearchBar";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <HomeButton />
      <SearchBar />
    </div>
  );
};

export default Header;
