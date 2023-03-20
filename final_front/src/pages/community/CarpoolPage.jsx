import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CarpoolPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Carpool
      </div>
    </>
  );
};

export default CarpoolPage;
