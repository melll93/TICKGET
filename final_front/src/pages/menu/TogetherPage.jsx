import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TogetherBoardList from "../board/together/TogetherBoardList";

const TogetherPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <h3 style={{ marginLeft: "100px" }}>Together 게시판</h3>
        <TogetherBoardList />
        <Footer />
      </div>
    </>
  );
};

export default TogetherPage;
