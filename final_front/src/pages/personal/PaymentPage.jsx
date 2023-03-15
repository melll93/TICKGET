import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const PaymentPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">payment</div>
    </>
  );
};

export default PaymentPage;
