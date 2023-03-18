import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const MyPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">MyPage</div>
    </>
  );
};

export default MyPage;
