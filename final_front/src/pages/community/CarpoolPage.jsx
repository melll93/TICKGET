/* global kakao */
import React, { useEffect, useState } from "react";
import { getMovieListDB } from "../../axios/main/main";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import KakaoMap from "../carpool/Map/KakaoMap"
import LandingPage from "../carpool/Map/LandingPage"

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
        {<KakaoMap />}
        <br/>
        <div style={{
          border: "1px solid lightGray",
          borderRadius: "10px",
          width: "90%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>

        {<LandingPage />}
        </div>
      </div>
    </>
  );
};

export default CarpoolPage;
