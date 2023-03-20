import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const FestivalPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Festival
      </div>
    </>
  );
};

export default FestivalPage;
