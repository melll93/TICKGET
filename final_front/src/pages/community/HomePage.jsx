import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/BasicTable";
import Header from "../../components/Header";
import MainCarousel from "../../components/MainCarousel";
import Sidebar from "../../components/Sidebar";
import MainCalendar from "../../components/MainCalendar";

const HomePage = ({ user }) => {
  /******************************
   * 조회 순 나열해서 뿌려주기,
   * 검색하면 키워드별로 뿌려주기
   ******************************/
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <MainCarousel />
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
