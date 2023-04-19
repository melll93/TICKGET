import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/mainpage/BasicTable";
import Header from "../../components/Header";
import CarouselList from "../../components/mainpage/CarouselList";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import CalendarPage from "../menu/CalendarPage";
import { festivalListByDate } from "../../axios/festival/festival";
import { festivalHitListDB } from "../../axios/festival/festival";
import { Link } from "react-router-dom";
import { searchById } from "../../axios/member/member";
import UserProfile from "../../components/UserProfile";

const HomePage = () => {
  /******************************
   * SearchBar : keyword 검색해서 페이지 이동(/search)
   * MainCarousel : 오늘 날짜로 검색해서 뿌려주기,
   * BasicTable : 게시판 별 최신 글 출력해주기, Link to
   * MainCalendar : 날짜 클릭하면 하단에 해당 날짜별 축제 출력해주기(Grid)
   ******************************/
  const reduxUser = useSelector((state) => state.userStatus.user);

  const [festivalToday, setFestivalToday] = useState([]);
  const [festivalHitList, setFestivalHitList] = useState([]);

  const getTodayList = () => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() - 2;
    const date = getDate.getDate();
    const fullDate = year + "-" + month + "-" + date;
    console.log(fullDate);
    // paramete : YYYY-MM-DD
    festivalListByDate(fullDate).then(console.log);
    festivalListByDate(fullDate).then(setFestivalToday);
  };

  useEffect(() => {
    getTodayList();

    const festivalHitList = async () => {
      const festMHit = true; // festHit 변수에 true 값을 할당하여 HIT가 높은 순으로 데이터를 가져옴
      const result = await festivalHitListDB(festMHit); // FestivalHitListDB 함수를 호출하여 데이터를 가져옴
      setFestivalHitList(result); // 가져온 데이터를 상태값에 할당
    };
    festivalHitList(); // 데이터 가져오기
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <div style={{ margin: "100px 0px 20px 0px", width: "1900px" }}>
          <CarouselList festivalToday={festivalToday} />
        </div>

        <section
          className="home_bottom_section"
          style={{
            /*   border:'1px dotted gray',  */
            padding: "50px",
          }}
        >
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <h1>
              <strong>what's hot</strong>
            </h1>
            {festivalHitList.slice(0, 5).map((festival) => (
              <Link to={`/productsDetail/${festival.festMId}`}>
                <Card.Img
                  key={festival.festMId}
                  src={festival.festMImg}
                  style={{
                    width: "150px",
                    height: "200px",
                    marginRight: "20px",
                  }}
                  alt="Card image"
                />
              </Link>
            ))}
          </div>
        </section>

        <section
          className="home_total_sec"
          style={{ paddingLeft: "150px", backgroundColor: "lightgray" }}
        >
          <div className="total_section" style={{ display: "flex" }}>
            {/* 위클리랭킹 */}
            <div
              className="mainpage div div2"
              style={{ flex: "1", margin: "50px" }}
            >
              <div className="mainpage box">
                <div className="mainpage div div1">
                  <Tabs
                    defaultActiveKey="festival"
                    id="uncontrolled-tab-example"
                    className="margin0 mb-3"
                  >
                    <Tab eventKey="festival" title="Festival">
                      <BasicTable />
                    </Tab>
                    <Tab eventKey="together" title="Together">
                      <BasicTable />
                    </Tab>
                    <Tab eventKey="market" title="Market">
                      <BasicTable />
                    </Tab>
                  </Tabs>
                </div>{" "}
              </div>{" "}
            </div>
            {/* 위클리랭킹 */}

            {/* 지역별 추천 */}
            <div
              className="top_sec_div"
              style={{ margin: "50px", textAlign: "center", flex: "1" }}
            >
              <div className="card" style={{ display: "inline-block" }}>
                <p>지역별 추천</p>
                <img
                  src="./images_key/WOONGS.jpg"
                  style={{ width: "150px", margin: "15px" }}
                  alt="사진1"
                />
                <img
                  src="./images_key/WOONGS.jpg"
                  style={{ width: "150px", margin: "15px" }}
                  alt="사진1"
                />
                <img
                  src="./images_key/WOONGS.jpg"
                  style={{ width: "150px", margin: "15px" }}
                  alt="사진1"
                />
                <br />
                제목
                <div className="card-body">
                  <h5 className="card-title">설명 </h5>
                  <p className="card-text">설명2 </p>
                </div>
              </div>
            </div>

            {/* 지역별 추천 여기까지 */}
          </div>
        </section>
      </div>
      {/* center */}
    </>
  );
};

export default HomePage;
