import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const TicketPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">ticket</div>
    </>
  );
};

export default TicketPage;
