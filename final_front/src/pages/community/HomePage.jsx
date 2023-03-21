import React, { useEffect } from "react";
import Gnb from "../../components/Gnb";
import MainCarousel from "../../components/MainCarousel";
import Sidebar from "../../components/Sidebar";

const HomePage = ({ user }) => {
  /******************************
   * 조회 순 나열해서 뿌려주기,
   * 검색하면 키워드별로 뿌려주기
   ******************************/
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        <MainCarousel />
        <div className="mainpage box"></div>
        <div className="mainpage div div1">asd</div>
        <div className="mainpage div div2">asd</div>
        <div className="mainpage div div3">asd</div>
        <div className="mainpage div div4">asd</div>
      </div>
    </>
  );
};

export default HomePage;
