import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../header/SearchBar";

const HomeButton = ({ icon }) => {
  return (
    <>
      <div className="HomeButton">
        <Link to="/" className="link">
          <img
            className={icon + " image40"}
            src="../logos/tickget.png"
            style={{ width: "90%" }}
          />
        </Link>
      </div>
    </>
  );
};

export default HomeButton;
