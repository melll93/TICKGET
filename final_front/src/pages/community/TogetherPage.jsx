import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const TogetherPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Together
      </div>
    </>
  );
};

export default TogetherPage;
