/* 은영 수정중 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  FetivalListDB,
  KyeongkiFestivalListDB,
  SeoulFestivalListDB,
} from "../../axios/festival/festival";
import PaginationPrac from "../../components/PaginationPrac";
import FestivalNavbar from "../festival/FestivalNavbar";
import HeaderSearchBar from "../../components/header/HeaderSearchBar";

///////////////////////////////      페스티발 지역별(서울)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const SeoulFestivalList = () => {
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    SeoulFestivalListDB().then(setFestivals);
  }, []);
  return (
    <>
      <div>
        {festivals.data &&
          festivals.data.map((festival, i) => {
            return (
              <div
                key={festival.festMId}
                className="card"
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "50px 0px 0px 50px",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={"/productsDetail/" + festival.festId}
                >
                  <img src={festival.festMImg} width="100%" alt="사진1" />
                  서울 상품
                  <div className="card-body">
                    <h5 className="card-title">제목 : {festival.festMName}</h5>
                    <p className="card-text">로케 : {festival.festMLoc}</p>
                    <p className="card-text">
                      {" "}
                      {festival.festMStart} ~ {festival.festMEnd}{" "}
                    </p>
                    <p className="card-text"> festId: {festival.festMId} </p>
                    <p className="card-text">
                      {" "}
                      festCategory: {festival.festMGenre}{" "}
                    </p>
                  </div>
                </a>
              </div>
            ); //안쪽리턴
          })}{" "}
        {/*  map*/}
      </div>
    </>
  ); //리턴끝
}; //SeoulFestivalList끝

///////////////////////////////      페스티발 지역별 (경기)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const KyeongkiFestivalList = () => {
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    KyeongkiFestivalListDB().then(setFestivals);
  }, []);
  return (
    <>
      <div>
        {festivals.data &&
          festivals.data.map((festival, i) => {
            return (
              <div
                key={festival.festMId}
                className="card"
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "50px 0px 0px 50px",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={"/productsDetail/" + festival.festMId}
                >
                  <img src={festival.festMImg} width="100%" alt="사진1" />
                  경기 상품
                  <div className="card-body">
                    <h5 className="card-title">제목 : {festival.festMName}</h5>
                    <p className="card-text">로케 : {festival.festMLoc}</p>
                    <p className="card-text">
                      {" "}
                      {festival.festMStart} ~ {festival.festMEnd}{" "}
                    </p>
                    <p className="card-text"> festId: {festival.festMId} </p>
                    <p className="card-text">
                      {" "}
                      festCategory: {festival.festMGenre}{" "}
                    </p>
                  </div>
                </a>
              </div>
            ); //안쪽리턴
          })}{" "}
        {/*  map*/}
      </div>
    </>
  ); //리턴끝
}; //SeoulFestivalList끝

const FestivalRankingList = () => {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        display: "inline-block",
        margin: "50px 0px 0px 50px",
      }}
    >
      랭킹별 분류 상품
      <div className="card-body">
        <h5 className="card-title">제목 :</h5>
        <p className="card-text">설명 : </p>
        <p className="card-text"> festId: </p>
        <p className="card-text"> festCategory: </p>
      </div>
    </div>
  );
};
const FestivalExtraList = () => {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        display: "inline-block",
        margin: "50px 0px 0px 50px",
      }}
    >
      기타 분류 상품
      <div className="card-body">
        <h5 className="card-title">제목 :</h5>
        <p className="card-text">설명 : </p>
        <p className="card-text"> </p>
      </div>
    </div>
  );
};

const FestivalsTest = () => {
  const [festivals, setFestivals] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [test, setTest] = useState(0);
  // console.log('랭스:'+festivals.length)
  // console.log('perPage: ' + perPage)
  useEffect(() => {
    FetivalListDB().then(setFestivals);
  }, []);
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (festivals) => {
    let currentFest = 0;
    currentFest = festivals.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  return (
    <>
      <div>
        {currentFest(festivals) &&
          currentFest(festivals).map((festival, i) => {
            // console.log(festival)
            return (
              <div
                key={festival.festMId}
                className="card"
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "50px 0px 0px 50px",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={"/productsDetail/" + festival.festMId}
                >
                  <img src={festival.festMImg} width="100%" alt="사진1" />
                  <div className="card-body">
                    <h5 className="card-title">제목 : {festival.festMName}</h5>
                    <p className="card-text">로케 : {festival.festMLoc}</p>
                    <p className="card-text">
                      {" "}
                      {festival.festMStart} ~ {festival.festMEnd}{" "}
                    </p>
                    <p className="card-text"> festId: {festival.festMId} </p>
                    <p className="card-text">
                      {" "}
                      festCategory: {festival.festMGenre}{" "}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <PaginationPrac
          currentFest={currentFest(festivals)}
          pagination={setPage}
          perPage={perPage}
          totalFest={festivals.length}
        />
      </div>
    </>
  );
}; ///////////////////////////////////// FestivalsTest 끝////////////////////////////////////////

const FestivalPage = () => {
  let [totalFest, setTotalFest] = useState(1); //0이면 닫힘, 1이면 열림.
  const [modal2, setModal2] = useState(0); //지역별(서울)
  const [modal2_1, setModal2_1] = useState(0); //지역별(경기)
  const [modal3, setModal3] = useState(0); //인기순/랭킹
  const [modal4, setModal4] = useState(0);
  const changeModal = () => {
    setTotalFest(1);
    setModal2(0);
    setModal2_1(0);
    setModal3(0);
    setModal4(0);
  };
  const modal2open = () => {
    setTotalFest(0);
    setModal2(1);
    setModal2_1(0);
    setModal3(0);
    setModal4(0);
  };
  const modal2_1open = () => {
    setTotalFest(0);
    setModal2(0);
    setModal2_1(1);
    setModal3(0);
    setModal4(0);
  };
  const modal3open = () => {
    setTotalFest(0);
    setModal2(0);
    setModal2_1(0);
    setModal3(1);
    setModal4(0);
  };
  const modal4open = () => {
    setTotalFest(0);
    setModal2(0);
    setModal2_1(0);
    setModal3(0);
    setModal4(1);
  };

  return (
    <>
          <Header />
      <Sidebar />
      <div className="center">
        <FestivalNavbar
          changeModal={changeModal}
          modal2open={modal2open}
          modal2_1open={modal2_1open}
          modal3open={modal3open}
          modal4open={modal4open}
        />

        {/* 상품등록버튼 - 관리자 페이지로 이동..? or 기업회원 로그인시에만 보이도록 수정 예정 */}
        <Link
          to="/addProducts"
          style={{
            fontSize: "40px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          상품등록버튼
        </Link>

        {/* 나브바 카테고리별 클릭시 화면 전환 */}
        {totalFest === 1 ? <FestivalsTest /> : null}
        <br />
        {modal2 === 1 ? <SeoulFestivalList /> : null}
        {modal2_1 === 1 ? <KyeongkiFestivalList /> : null}
        {modal3 === 1 ? <FestivalRankingList /> : null}
        {modal4 === 1 ? <FestivalExtraList /> : null}
      </div>
    </>
  );
};

export default FestivalPage;
