import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const SettingPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Setting
      </div>
    </>
  );
};

export default SettingPage;
