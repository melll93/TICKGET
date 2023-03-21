import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const CarpoolPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Carpool
      </div>
    </>
  );
};

export default CarpoolPage;
