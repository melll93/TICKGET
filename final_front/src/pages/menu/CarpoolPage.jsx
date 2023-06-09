import React, { useEffect, useState } from "react";
import { getMovieListDB } from "../../axios/festival/main";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CarpoolBoardList from "../board/carpool/CarpoolBoardList";
import Footer from "../../components/Footer";

const CarpoolPage = () => {
  const [dbResults, setDbResults] = useState([]);

  useEffect(() => {
    getMovieListDB().then(setDbResults);
  }, []);

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
            <i className="bi bi-people-fill"></i> Carpool 게시판
          </h3>
        </div>
        <CarpoolBoardList />
        <Footer />
      </div>
    </>
  );
};

export default CarpoolPage;
