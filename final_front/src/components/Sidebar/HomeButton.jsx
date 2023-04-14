import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Gnb/SearchBar";

const HomeButton = () => {
  return (
    <>

      <Link to="/" className="link">
        <div className="HomeButton">
          <img className="icon image40" src="../logos/tickget.png" style={{ width: '100px' }} />
        </div>
      </Link>

    </>
  );
};

export default HomeButton;
