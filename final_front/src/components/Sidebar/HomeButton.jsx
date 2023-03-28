import React from "react";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/" className="link">
      <div className="HomeButton">
        <img className="icon image40" src="../logos/HOME.png" />
        {/* <img className="icon image40" src="../images_key/ticket_sample.png" /> */}
        <span>DOMAIN NAME</span>
      </div>
    </Link>
  );
};

export default HomeButton;
