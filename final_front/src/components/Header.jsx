import React from "react";
import HeaderSearchBar from "./Gnb/HeaderSearchBar";
import HomeButton from "./Sidebar/HomeButton";
import "../styles/header.css";
import SearchBar from "./Gnb/SearchBar";

const Header = () => {
  return (
    <div className="header">
      <HomeButton />
      <SearchBar />
    </div>
  );
};

export default Header;
