import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CartPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">cart</div>
    </>
  );
};

export default CartPage;
