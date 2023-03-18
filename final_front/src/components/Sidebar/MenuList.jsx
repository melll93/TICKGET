import React, { useState } from "react";
import Menu from "./Menu";

const MenuList = () => {
  const [items, setItems] = useState([
    "FESTIVAL",
    "CONCERT",
    "TOGETHER",
    "CARPOOL",
    "DONATION",
    "CALENDAR",
    "MESSAGE",
  ]);

  return (
    <div className="MenuList">
      {items.map((item, index) => <Menu key={index} item={item} />)}
    </div>
  )
};
export default MenuList;
