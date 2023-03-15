import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">concert</div>
    </>
  );
};

export default ConcertPage;
