import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ item }) => {
  const urlLower = item.toLowerCase();
  console.log(typeof item);
  return (
    <div className="Menu">
      <Link to={"/" + urlLower} className="Menu aTag">
        <img className="image20" src={"logos/" + item + ".png"}></img>
        <div className="TextBox">
          <p>{item}</p>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
