import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const CartPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Cart
      </div>
    </>
  );
};

export default CartPage;
