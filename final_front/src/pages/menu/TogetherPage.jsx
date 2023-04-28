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
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <h3
            style={{
              display: "inline-block",
              fontFamily: "Nanum Gothic",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            <i class="bi bi-people-fill"></i> TOGETHER 게시판
          </h3>
        </div>
        <TogetherBoardList />
        <Footer />
      </div>
    </>
  );
};

export default TogetherPage;
