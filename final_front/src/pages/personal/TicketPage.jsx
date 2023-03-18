import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const TicketPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Ticket
      </div>
    </>
  );
};

export default TicketPage;
