import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const HomePage = () => {
  /******************************
   * 조회 순 나열해서 뿌려주기,
   * 검색하면 키워드별로 뿌려주기
   ******************************/
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">main</div>
    </>
  );
};

export default HomePage;
