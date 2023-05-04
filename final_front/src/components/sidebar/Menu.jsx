import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css";



const Menu = ({ item }) => {
  const urlLower = item.toLowerCase();
  return (
    <div className="Menu">
      <Link to={"/" + urlLower} className="link Menu aTag">
        <img className="icon image20" src={"/logos/" + item + ".png"}></img>
        <div className="TextBox">
          <span className="menuLIst">{item}</span>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
