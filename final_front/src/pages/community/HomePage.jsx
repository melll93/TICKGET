import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/MainPage/BasicTable";
import Header from "../../components/Header";
import CarouselList from "../../components/MainPage/CarouselList";
import Sidebar from "../../components/Sidebar";
import MainCalendar from "../../components/MainPage/MainCalendar";
import { getFestivalTodayDB } from "../../axios/main/main";

const HomePage = () => {
  /******************************
   * SearchBar : keyword 검색해서 페이지 이동(/search)
   * MainCarousel : 오늘 날짜로 검색해서 뿌려주기,
   * BasicTable : 게시판 별 최신 글 출력해주기, Link to
   * MainCalendar : 날짜 클릭하면 하단에 해당 날짜별 축제 출력해주기(Grid)
   ******************************/
  const [festivalToday, setFestivalToday] = useState([]);

  const getTodayList = () => {
    getFestivalTodayDB().then(setFestivalToday);
  };

  useEffect(() => {
    getTodayList();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <CarouselList festivalToday={festivalToday} />
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
              <Tab eventKey="concert" title="Concert">
                <BasicTable />
              </Tab>
              <Tab eventKey="together" title="Together">
                <BasicTable />
              </Tab>
              <Tab eventKey="carpool" title="Carpool">
                <BasicTable />
              </Tab>
            </Tabs>
          </div>
          <div className="mainpage div div2">
            <MainCalendar />
          </div>
        </div>
  
        {/* <div className="mainpage box">
          <div className="mainpage div div3">
            <BasicTable />
          </div>
          <div className="mainpage div div4">
            <BasicTable />
          </div>
        </div> */}
  
      </div>
    </>
  );
};

export default HomePage;
