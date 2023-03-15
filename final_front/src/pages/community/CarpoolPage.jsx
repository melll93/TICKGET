import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CarpoolPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">carpool</div>
    </>
  );
};

export default CarpoolPage;
