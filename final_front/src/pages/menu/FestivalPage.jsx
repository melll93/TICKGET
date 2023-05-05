/* 은영 수정중 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  FetivalListDB,
  thumbsupFestivalDB,
} from "../../axios/festival/festival";
import CommonPagination from "../../components/mainpage/CommonPagination";
import FestivalRankingList from "../festival/FeativalRankingList";
import "../../styles/festivaldetails.css";
import FestivalAreaList from "../festival/FestivalAreaList";
import { Cookies } from "react-cookie";
import Footer from "../../components/Footer";




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



/* 
///////// 페스티벌 전체 ////////// 
 */
const FestivalsTest = () => {

  const [festivals, setFestivals] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [thumbsup, setThumbsup] = useState(0);


  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;



  const hitPlusOne = (festMId) => {
    thumbsupFestivalDB(festMId)
      .then(() => {
        const updatedFestivals = [...festivals];
        const festivalToUpdate = updatedFestivals.find(festival => festival.festMId === festMId);
        festivalToUpdate.festMHit += 1;
        setFestivals(updatedFestivals);
      })
      .catch((error) => {
        console.error("Error updating thumbs up count:", error);
      });
  };

  const currentFest = (festivals) => {
    let currentFest = 0;
    currentFest = festivals.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  useEffect(() => {
    FetivalListDB().then(setFestivals);
  }, []);

  return (
    <>
      <div>
        {currentFest(festivals) &&
          currentFest(festivals).map((festival, i) => {
            // console.log(festival)
            return (
              <div
                key={i}
                className="card "
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "70px 0px 0px 75px",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={"/productsDetail/" + festival.festMId}
                >
                  <img src={festival.festMImg} style={{ width: "100%", overflow: 'hidden', height: '380px' }} alt="사진1" />
                  <div className="card-body" style={{ overflow: 'hidden', height: '150px' }} >
                    <div style={{ height: '30px', overflow: 'hidden', padding: '5px', marginBottom: '15px' }}>
                      <h5 className="card-title"><strong>{festival.festMName}</strong></h5>
                    </div>
                    <p className="card-text"><i className="bi bi-geo-alt-fill"></i> {festival.festMLoc}</p>
                    <p className="card-text">
                      <i className="bi bi-calendar"></i> {festival.festMStart} ~ {festival.festMEnd}
                    </p>
                  </div>
                </a>
                <div className='thumbs-up' onClick={() => { hitPlusOne(festival.festMId) }} style={{ borderRadius: '5px', border: '1px solid lightgray', textAlign: 'center', marginLeft: '0%', paddingRight: '7px', cursor: 'pointer' }}>
                  <i className="bi bi-hand-thumbs-up fs-4"></i>
                  {festival.festMHit == null ? 0 : festival.festMHit}
                </div>
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "center", marginTop: '100px' }}>
        <CommonPagination
          pagination={setPage}
          perPage={perPage}
          totalItems={festivals.length}
        />
      </div>
    </>
  );
}; ///////////////////////////////////// FestivalsTest 끝////////////////////////////////////////





const FestivalPage = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  const [totalFest, setTotalFest] = useState(1); //0이면 닫힘, 1이면 열림.
  const [modal2, setModal2] = useState(0); //지역별
  const [modal3, setModal3] = useState(0); //인기순/랭킹
  const [modal4, setModal4] = useState(0);
  const [style, setStyle] = useState({ display: 'none' })
  const [selectedNavbarValue, setSelecteNavbarValue] = useState("");  //나브바 선택 벨류
  const areaOpen = () => { setTotalFest(0); setModal2(1); setModal3(0); setModal4(0); };

  const changeModal = () => {
    setTotalFest(1);
    setModal2(0);
    setModal3(0);
    setModal4(0);

  };
  const seoul = () => {
    setSelecteNavbarValue("서울")
    areaOpen();
  };
  const kyeongkiAndIncheon = () => {
    setSelecteNavbarValue("경기/인천")
    areaOpen();
  };
  const chungAndKangwon = () => {
    setSelecteNavbarValue("충청/강원")
    areaOpen();
  };
  const daeguAndKyungBuk = () => {
    setSelecteNavbarValue("대구/경북")
    areaOpen();
  };

  const busanAndKyungNam = () => {
    setSelecteNavbarValue("부산/경남")
    areaOpen();
  };

  const kwanjuAndJunla = () => {
    setSelecteNavbarValue("광주/전라")
    areaOpen();
  };

  const Jeju = () => {
    setSelecteNavbarValue("제주")
    areaOpen();
  };


  const rankingModalopen = () => {
    setTotalFest(0);
    setModal2(0);
    setModal3(1);
    setModal4(0);
  };

  const modal4open = () => {
    setTotalFest(0);
    setModal2(0);
    setModal3(0);
    setModal4(1);
  };

  return (
    <>

      <Header />
      <Sidebar />

      <div className="center">
        {/*        <FestivalNavbar
          changeModal={changeModal}
          modal2open={modal2open}
          modal2_1open={modal2_1open}
          modal3open={modal3open}
          modal4open={modal4open}
        /> */}


        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container-fluid2" >
            <ul className="navbar-nav">

              {/* 전체 */}
              <ul className="nav-item">
                <li className="nav-link2" onClick={changeModal} style={{ marginLeft: "150px" }}> 전체 </li>
              </ul>{/* end of  전체 */}

              {/* 지역별 */}
              <ul className="nav-item">
                <ul className="nav-link2" style={{ marginLeft: "150px" }} onMouseEnter={e => { setStyle({ display: 'block' }) }}
                  onMouseLeave={e => { setStyle({ display: 'none' }) }} > 지역별 <ul style={style}>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={seoul}> 서울 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={kyeongkiAndIncheon}> 경기/인천 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={chungAndKangwon}> 충청/강원 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={daeguAndKyungBuk}> 대구/경북 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={busanAndKyungNam}> 부산/경남 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={kwanjuAndJunla}> 광주/전라 </li>
                    </ul>
                    <ul className="nav-item">
                      <li className="nav-link2" onClick={Jeju}> 제주 </li>
                    </ul>
                  </ul>
                </ul>
              </ul>{/* end of 지역별 */}

              {/* 인기순 */}
              <ul className="nav-item">
                <li className="nav-link2" style={{ marginLeft: "150px" }} onClick={rankingModalopen}> 인기순/랭킹 </li>
              </ul>

              {/* 기타 */}
              <ul className="nav-item">
                <li className="nav-link2" style={{ marginLeft: "150px" }} onClick={modal4open}> 기타 </li>
              </ul> {/* end of 기타*/}


              <li className="nav-link2" style={{ marginLeft: "150px" }} onClick={modal4open}>
                {_userData && _userData.memberAuthority === "ROLE_ADMIN" ? <Link
                  to="/addProducts/new"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                  }}
                >
                  상품등록버튼
                </Link> : null}
              </li>

            </ul>{/* end of navbar-nav  */}
          </div>{/* end of container-fluid */}
        </nav>{/* end of navbar navbar-expand-sm bg-dark navbar-dark */}


        {/* 나브바 카테고리별 클릭시 화면 전환 */}
        {totalFest === 1 ? <FestivalsTest /> : null}
        {modal2 === 1 ? <FestivalAreaList selectedNavbarValue={selectedNavbarValue} /> : null}
        {modal3 === 1 ? <FestivalRankingList /> : null}
        {modal4 === 1 ? <FestivalExtraList /> : null}
        <div style={{ marginTop: '300px' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FestivalPage;
