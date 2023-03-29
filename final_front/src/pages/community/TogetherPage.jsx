import React from "react";
import Footer from "../../components/Footer";
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
        <Footer/>
      </div>
    </>
  );
};

export default TogetherPage;
