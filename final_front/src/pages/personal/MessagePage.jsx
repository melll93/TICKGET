import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const MessagePage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Message
      </div>
    </>
  );
};

export default MessagePage;
