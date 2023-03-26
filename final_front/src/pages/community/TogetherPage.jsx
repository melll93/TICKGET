import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import BoardList from "../board/BoardList";

const TogetherPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <BoardList/>
      </div>
    </>
  );
};

export default TogetherPage;
