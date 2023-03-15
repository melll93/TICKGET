import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const DonationPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">donation</div>
    </>
  );
};

export default DonationPage;
