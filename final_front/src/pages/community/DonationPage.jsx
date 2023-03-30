import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SitePick from "../../components/MainPage/SitePick";
import WeeksHot from "../../components/MainPage/WeeksHot";
import { getOpenSoonListDB } from "../../axios/main/main";
import OpenSoon from "../../components/MainPage/OpenSoon";

const DonationPage = () => {
  const [openSoonList, setOpenSoonList] = useState([])
  /*   const [openSoonList, setOpenSoonList] = useState([])
  
    const getOpenSoonList = () => {
      getOpenSoonListDB().then(setOpenSoonList);
    };
  
    useEffect(() => {
      getOpenSoonList();
    }, []);
  
  
  useEffect(() => {
    getOpenSoonList();
  }, []);
     */

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
            <SitePick />
          </Tab>
          <Tab eventKey="openSoon" title="오픈 예정">
          </Tab>
          <Tab eventKey="weeksHot" title="이 주의 공연">
            <WeeksHot />
          </Tab>
        </Tabs>
        defaultActiveKey="openSoon"
        id="justify-tab-example"
        className="tab3"
        justify
        <Tab eventKey="sitePick" title="사이트's PICK!">
          <SitePick />
        </Tab>
        <Tab eventKey="openSoon" title="오픈 예정">
          <OpenSoon openSoonList={openSoonList} />
        </Tab>
        <Tab eventKey="weeksHot" title="이 주의 공연">
          <WeeksHot />
        </Tab>
      </div >
    </>
  );
import { Button, Table } from 'react-bootstrap'
import DonationFooter from "../donation/DonationFooter";
import Footer from "../../components/Footer";

const DonationPage = () => {

  
  return (
     <>
   <Sidebar/> 
     <div className="center">
     <Header/>
     <div className='container'>
         <div className="page-header">
       {/*   <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>부서목록</small></h2> */}
            {/* <hr/> */}
            </div>
         <div className="row">
            <div className="col-3">
            <select id="gubun" className="form-select" aria-label="분류선택">
                  <option defaultValue>분류선택</option>
                  <option value="deptno">제목</option> {/* value는 컬럼명에 맞추기 */}
                  <option value="dname">카테고리</option> {/* value는 컬럼명에 맞추기 */}
                  <option value="loc">날짜</option>        {/* value는 컬럼명에 맞추기 */}
            </select>
            </div>
            </div>
                  <div className="col-6">
                     <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요"
                     aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
                  </div>
                  <div className="col-3">
                     <Button variant='danger' id="btn_search">검색</Button>
                  </div>
            </div>
         <div className='book-list'>
            <Table striped bordered hover>
            <thead>
                  <tr>
                  <th>상품정보</th>
                  <th>수량</th>
                  <th>가격</th>
                  <th>등록일</th>
                  </tr>
            </thead>
            <tbody>
      {/*       {deptList.map(dept => (
        <DeptRow key={dept.DEPTNO} dept={dept} />
      ))} */}

      {/*DonationRow에서 받아온 글 리스트 */}
            </tbody>
            </Table>
            <hr />
            <div className='booklist-footer'>
            <Button variant="warning" >
                  전체조회
            </Button>&nbsp;
            <Button variant="success" >
                  부서등록
            </Button>
      </div>
         </div>
     </div>
     </>
    )
};

export default DonationPage;
