import React from "react";
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
