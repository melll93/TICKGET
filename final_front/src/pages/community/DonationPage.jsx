import React, { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from "react-bootstrap/esm/Tabs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import OpenSoon from "../../components/MainPage/OpenSoon";
import SitePick from "../../components/MainPage/SitePick";
import WeeksHot from "../../components/MainPage/WeeksHot";
import { getOpenSoonListDB } from "../../axios/main/main";

const DonationPage = () => {
const [openSoonList, setOpenSoonList] = useState([])

const getOpenSoonList = () => {
  getOpenSoonListDB().then(setOpenSoonList);
};

useEffect(() => {
  getOpenSoonList();
}, []);
  
  
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Donation - 메인홈페이지에 추가할 코드 테스트 중 (성훈)
        <Tabs
      defaultActiveKey="openSoon"
      id="justify-tab-example"
      className="tab3"
      justify
    >
      <Tab eventKey="sitePick" title="사이트's PICK!">
        <SitePick/>
      </Tab>
      <Tab eventKey="openSoon" title="오픈 예정">
        <OpenSoon openSoonList={openSoonList}/>
      </Tab>
      <Tab eventKey="weeksHot" title="이 주의 공연">
        <WeeksHot/>
      </Tab>
    </Tabs>
      </div>
    </>
  );
};

export default DonationPage;
