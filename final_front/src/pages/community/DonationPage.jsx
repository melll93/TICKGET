import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const DonationPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Donation
      </div>
    </>
  );
};

export default DonationPage;
