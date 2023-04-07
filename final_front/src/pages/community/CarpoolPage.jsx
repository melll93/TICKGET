/* global kakao */
import React, { useEffect, useState } from "react";
import { getMovieListDB } from "../../axios/main/main";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import KakaoMap from "../carpool/KakaoMap";
import LandingPage from "../carpool/LandingPage";


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
        {<LandingPage />}
      </div>
    </>
  );
};

export default CarpoolPage;
