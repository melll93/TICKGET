import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const MyPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Mypage
      </div>
    </>
  );
};

export default MyPage;
