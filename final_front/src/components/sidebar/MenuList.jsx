import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { Cookies } from "react-cookie";

const MenuList = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData");

  let items;

  const renderItems = () => {
    _userData
      ? (items = [
          "FESTIVAL",
          "CONCERT",
          "TOGETHER",
          "CARPOOL",
          "MARKET",
          "CHAT",
        ])
      : (items = ["FESTIVAL", "CONCERT", "TOGETHER", "CARPOOL", "MARKET"]);

    return items.map((item, index) => <Menu key={index} item={item} />);
  };

  return <div className="MenuList">{renderItems()}</div>;
};
export default MenuList;
