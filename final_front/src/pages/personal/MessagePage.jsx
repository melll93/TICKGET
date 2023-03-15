import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const MessagePage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">message</div>
    </>
  );
};

export default MessagePage;
