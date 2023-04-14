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
      <Sidebar />
      <div className="center">
        <Header />
        <h3 style={{ marginLeft: "100px" }}>Carpool 게시판</h3>
        {<CarpoolBoardList />}
      </div>
    </>
  );
};

export default CarpoolPage;
