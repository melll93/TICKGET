import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TogetherBoardList from "../together/TogetherBoardList";

const TogetherPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <TogetherBoardList/>
        <Footer/>
      </div>
    </>
  );
};

export default TogetherPage;
