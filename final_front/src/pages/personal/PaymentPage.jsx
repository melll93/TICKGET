import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const PaymentPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Payment
      </div>
    </>
  );
};

export default PaymentPage;
