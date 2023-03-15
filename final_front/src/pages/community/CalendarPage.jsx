import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CalendarPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">calendar</div>
    </>
  );
};

export default CalendarPage;
