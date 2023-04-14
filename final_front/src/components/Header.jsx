import React from "react";
import HeaderSearchBar from "./header/HeaderSearchBar";
import HomeButton from "./sidebar/HomeButton";
import SearchBar from "./header/SearchBar";
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
