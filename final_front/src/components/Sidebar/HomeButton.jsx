import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Gnb/SearchBar";

const HomeButton = () => {
  return (
    <>

    <Link to="/" className="link">
      <div className="HomeButton">
        <img className="icon image40" src="../logos/LOGOSIAN.png" style={{width:'230px'}}/>
      </div>
    </Link>
    
    </>
  );
};

export default HomeButton;
