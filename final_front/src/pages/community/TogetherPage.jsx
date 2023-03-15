import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const TogetherPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">together</div>
    </>
  );
};

export default TogetherPage;
