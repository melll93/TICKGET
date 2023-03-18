import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const PaymentPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Payment
      </div>
    </>
  );
};

export default PaymentPage;
