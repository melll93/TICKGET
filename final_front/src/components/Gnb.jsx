import React from "react";
import { Link } from "react-router-dom";

const Gnb = () => {
  return (
    <div className="Gnb">
      <Link to="/">
        <img className="image50" src="logos/HOME.png" />
        <p>DOMAIN NAME</p>
      </Link>
    </div>
  );
};

export default Gnb;
