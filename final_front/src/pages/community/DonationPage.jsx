import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
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
