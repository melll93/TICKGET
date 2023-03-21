import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const SettingPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Setting
      </div>
    </>
  );
};

export default SettingPage;
