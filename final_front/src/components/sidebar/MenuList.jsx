import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { Cookies } from "react-cookie";

const MenuList = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData");
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   userCookie && setUserData(userCookie);
  // }, []);

  useEffect(() => {
    if (_userData) {
      setItems([
        "FESTIVAL",
        "CONCERT",
        "TOGETHER",
        "CARPOOL",
        "MARKET",
        "CHAT",
      ]);
    } else {
      setItems(["FESTIVAL", "CONCERT", "TOGETHER", "CARPOOL", "MARKET"]);
    }
  }, [items]);

  return (
    <div className="MenuList">
      {items.map((item, index) => (
        <Menu key={index} item={item} />
      ))}
    </div>
  );
};
export default MenuList;
