import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Gnb/SearchBar";

const HomeButton = () => {
  return (
    <>
      <div className="HomeButton">
        <Link to="/" className="link">
          <img
            className="icon image40"
            src="../logos/tickget.png"
            style={{ width: "100px" }}
          />
        </Link>
      </div>
    </>
  );
};

export default HomeButton;
