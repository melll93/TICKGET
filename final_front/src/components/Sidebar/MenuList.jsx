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

  return items.map((item, index) => <Menu key={index} item={item} />);
};
export default MenuList;
