import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const CalendarPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        calendar
      </div>
    </>
  );
};

export default CalendarPage;
