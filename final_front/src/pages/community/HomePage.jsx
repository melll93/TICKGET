import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/mainpage/BasicTable";
import Header from "../../components/Header";
import CarouselList from "../../components/mainpage/CarouselList";
import Sidebar from "../../components/Sidebar";
import MainCalendar from "../../components/mainpage/MainCalendar";
import { getFestivalTodayDB } from "../../axios/main/main";
import { useSelector } from "react-redux";
import CalendarPage from "../personal/CalendarPage";
import { festivalListByDate } from "../../axios/main/Festival";

const HomePage = () => {
  /******************************
   * SearchBar : keyword 검색해서 페이지 이동(/search)
   * MainCarousel : 오늘 날짜로 검색해서 뿌려주기,
   * BasicTable : 게시판 별 최신 글 출력해주기, Link to
   * MainCalendar : 날짜 클릭하면 하단에 해당 날짜별 축제 출력해주기(Grid)
   ******************************/
  const reduxUser = useSelector((state) => state.userStatus.user);

  const [festivalToday, setFestivalToday] = useState([]);

  const getTodayList = () => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const date = getDate.getDate();
    const fullDate = year + "-" + month + "-" + date;
    console.log(fullDate);
    // paramete : YYYY-MM-DD
    festivalListByDate(fullDate).then(console.log);
    festivalListByDate(fullDate).then(setFestivalToday);
  };

  useEffect(() => {
    getTodayList();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <div style={{ margin: "100px 0px 20px 0px", width: "1900px" }}>
          <CarouselList festivalToday={festivalToday} />
        </div>

        <section className="home_total_sec" style={{ paddingLeft: "150px" }}>
          <section className="total_section" style={{ display: "flex" }}>
            <div
              className="top_sec_div"
              style={{ margin: "50px", textAlign: "center", flex: "1" }}
            >
              <div className="card">
                <p>이 주의 공연</p>
                <img src="./images_key/WOONGS.jpg" width="100%" alt="사진1" />
                서울 상품
                <div className="card-body">
                  <h5 className="card-title">제목 </h5>
                  <p className="card-text">로케 </p>
                </div>
              </div>

              <div className="card">
                <img src="./images_key/WOONGS.jpg" width="100%" alt="사진1" />
                서울 상품
                <div className="card-body">
                  <h5 className="card-title">제목 </h5>
                  <p className="card-text">로케 </p>
                </div>
              </div>

              <div className="card">
                <img src="./images_key/WOONGS.jpg" width="100%" alt="사진1" />
                서울 상품
                <div className="card-body">
                  <h5 className="card-title">제목 </h5>
                  <p className="card-text">로케 </p>
                </div>
              </div>
            </div>

            <div
              className="mainpage div div2"
              style={{ flex: "0.3", margin: "50px" }}
            >
              {/* <MainCalendar/>
               */}
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
                    <Tab eventKey="calendar" title="Calendar">
                      <CalendarPage />
                    </Tab>
                  </Tabs>
                </div>{" "}
                {/* mainpage div div1 */}
              </div>{" "}
              {/* mainpage box*/}
            </div>

            {/* <div className="mainpage box">
          <div className="mainpage div div3">
            <BasicTable />
          </div>
          <div className="mainpage div div4">
            <BasicTable />
          </div>
        </div> */}
          </section>
        </section>
      </div>
    </>
  );
};

export default HomePage;
