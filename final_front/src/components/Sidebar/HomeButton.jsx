import React from "react";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/" className="link">
      <div className="HomeButton">
        <img className="icon image40" src="../logos/LOGOSIAN.png" style={{width:'270px'}}/>
      </div>
    </Link>
  );
};

export default HomeButton;
