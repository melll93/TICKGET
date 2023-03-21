import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const MyPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Mypage
      </div>
    </>
  );
};

export default MyPage;
