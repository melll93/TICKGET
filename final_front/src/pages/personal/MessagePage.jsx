import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const MessagePage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Message
      </div>
    </>
  );
};

export default MessagePage;
