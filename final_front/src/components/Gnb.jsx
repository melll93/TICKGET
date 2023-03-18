import React from "react";
import { Link } from "react-router-dom";
import HomeButton from "./Gnb/HomeButton";
import SearchBar from "./Gnb/SearchBar";

const Gnb = () => {
  return (
    <div className="Gnb">
      <Link to="/"><HomeButton /></Link>
      <SearchBar />
    </div>
  );
};

export default Gnb;
