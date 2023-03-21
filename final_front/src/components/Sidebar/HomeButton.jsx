import React from "react";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/">
      <div className="HomeButton">
        <img className="icon image40" src="logos/HOME.png" />
        <span>DOMAIN NAME</span>
      </div>
    </Link>
  );
};

export default HomeButton;
