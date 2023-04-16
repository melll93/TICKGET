import React, { useState } from "react";
import Menu from "./Menu";
import SearchBar from "../header/SearchBar";

const MenuList = () => {
  const [items, setItems] = useState([
    "FESTIVAL",
    // "CONCERT",
    "TOGETHER",
    "CARPOOL",
    "MARKET",
    // "CALENDAR",
    "CHAT",
  ]);

  return (
    <div className="MenuList">
      {items.map((item, index) => (
        <Menu key={index} item={item} />
      ))}
    </div>
  );
};
export default MenuList;
