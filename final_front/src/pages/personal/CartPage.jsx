import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CartPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Cart
      </div>
    </>
  );
};

export default CartPage;
