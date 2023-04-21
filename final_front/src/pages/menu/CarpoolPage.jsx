/* global kakao */
import React, { useEffect, useState } from "react";
import { getMovieListDB } from "../../axios/festival/main";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CarpoolBoardList from "../board/carpool/CarpoolBoardList";

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
            Carpool 게시판
          </h3>
        </div>
        {<CarpoolBoardList />}
      </div>
    </>
  );
};

export default CarpoolPage;
