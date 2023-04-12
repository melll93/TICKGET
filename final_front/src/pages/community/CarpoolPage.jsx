/* global kakao */
import React, { useEffect, useState } from "react";
import { getMovieListDB } from "../../axios/main/main";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import KakaoMap from "../carpool/Map/KakaoMap"
import LandingPage from "../carpool/Map/LandingPage"
import CarpoolBoardList from "../carpool/CarpoolBoardList";

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
        <h3 style={{marginLeft:"100px"}}>Carpool 게시판</h3>
        {<CarpoolBoardList/>}
      </div>
    </>
  );
};

export default CarpoolPage;
