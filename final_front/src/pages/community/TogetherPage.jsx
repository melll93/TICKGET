import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import BoardList from "../board/BoardList";
import Write from "../board/Write";

const TogetherPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <BoardList/>
        <Write/>
      </div>
    </>
  );
};

export default TogetherPage;
