import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const SettingPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">setting</div>
    </>
  );
};

export default SettingPage;
