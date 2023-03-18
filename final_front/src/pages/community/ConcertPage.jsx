import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Concert
      </div>
    </>
  );
};

export default ConcertPage;
