import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Table } from 'react-bootstrap'
import DonationFooter from "../donation/DonationFooter";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import DonationList from '../donation/DonationList'
import { don_boardListDB } from "../../axios/donation/donationLogic";

const DonationPage = () => {
      const navigate = useNavigate()
      const [boardList , setBoardList] = useState([])

    /*   useEffect = (() => {
        don_boardListDB()
      },[]) */

      const don_boardList = async() => {
            const res = await don_boardListDB();
            console.log(res.data);
            if (res.data && Array.isArray(res.data)) {
                  // 가져온 게시글 목록을 boardList state에 저장
                  setBoardList(res.data);
                } else {
                  console.log("게시글 목록 조회 실패");
                }
              };
            
  
  return (
     <>
   <Sidebar/> 
     <div className="center">
     <Header/>
     
     <div className='container'>
         <div className="page-header">
            </div>
         <div className="row">
            <div className="col-5">
            <select id="gubun" className="form-select" aria-label="분류선택" style={{width:'200px'}}>
                  <option defaultValue>분류선택</option>
                  <option value="don_title">글 제목</option> {/* value는 컬럼명에 맞추기 */}
                  <option value="don_ticket_date">공연일</option>        {/* value는 컬럼명에 맞추기 */}
            </select>
            </div>
            </div>
                  <div className="col-6">
                     <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요"
                     aria-label="검색어를 입력하세요" aria-describedby="btn_search" style={{width:'500px'}}/>
                  </div>
                  <div className="col-3">
                     <Button variant='danger' id="btn_search">검색</Button>
                  </div>
            </div>
            <hr/>
         <div className='book-list'>
            <Table striped bordered hover>
            <thead>
                  <tr >
                  <th style={{width:'400px', textAlign:"center"}}>상품정보</th>
                  <th style={{width:'100px', textAlign:"center"}}>수량</th>
                  <th style={{textAlign:"center"}}>가격</th>
                  <th style={{textAlign:"center"}}>등록일</th>
                  <th style={{textAlign:"center"}}>작성자</th>
                  <th style={{width:'100px',textAlign:"center"}}>조회수</th>
                  </tr>
            </thead>
            <tbody>
      {/*       {deptList.map(dept => (
        <DeptRow key={dept.DEPTNO} dept={dept} />
      ))} */}
      {/*DonationRow에서 받아온 글 리스트 */}
 <DonationList />
            </tbody>
            </Table>
            <hr />
            <div className='booklist-footer'>
            <Button variant="primary" >
                  전체조회
            </Button>&nbsp;
            <Button variant="primary" onClick={()=>navigate('/donation/write')}>
                  글쓰기
            </Button>
      </div>
         </div>
     </div>
     </>
    )
};

export default DonationPage;
