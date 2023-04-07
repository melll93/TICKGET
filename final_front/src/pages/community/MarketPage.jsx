import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Table } from 'react-bootstrap'
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import DonationList from '../market/MarketList'
import { don_boardListDB } from "../../axios/market/marketLogic";
import { FormDiv, HeaderDiv } from "../../styles/formStyle";
import DonationSearchBar from "../market/MarketSearchBar";
import MarketList from "../market/MarketList";
import MarketSearchBar from "../market/MarketSearchBar";

const MarketPage = () => {
      const navigate = useNavigate()
      const [boardList , setBoardList] = useState([])

    /*   useEffect = (() => {
        don_boardListDB()
      },[]) */

 /*      const don_boardList = async() => {
            const res = await don_boardListDB();
            console.log(res.data);
            if (res.data && Array.isArray(res.data)) {
                  // 가져온 게시글 목록을 boardList state에 저장
                  setBoardList(res.data);
                } else {
                  console.log("게시글 목록 조회 실패");
                }
              };
             */
  
  return (
     <>
   <Sidebar/> 
     <div className="center">
     <Header/>
     <HeaderDiv>
          <h3 style={{marginLeft:"100px"}}>마켓 게시판</h3>
          <Button variant="primary" style={{marginLeft:'700px'}}>
                  전체조회
          </Button>
          <Button variant="primary" onClick={()=>navigate('/market/write')}  style={{marginRight:'80px'}}>
                  글쓰기
            </Button>
        </HeaderDiv>
        <FormDiv style={{marginLeft:'50px'}}>
         

         <div className='book-list'>
            <Table striped bordered hover style={{minWidth:"800px"}}>
            <thead>
                  <tr >
                  <th style={{width:'100px',textAlign:"center"}}>번호</th>
                  <th style={{width:'500px', textAlign:"center"}}>상품정보</th>
                  <th style={{width:'100px', textAlign:"center"}}>수량</th>
                  <th style={{width:'100px',textAlign:"center"}}>가격</th>
                  <th style={{width:'150px',textAlign:"center"}}>등록일</th>
                  <th style={{width:'200px',textAlign:"center"}}>작성자</th>
                  <th style={{width:'100px',textAlign:"center"}}>조회수</th>
                  </tr>
            </thead>
            <tbody>
      {/*       {deptList.map(dept => (
        <DeptRow key={dept.DEPTNO} dept={dept} />
      ))} */}
      {/*DonationRow에서 받아온 글 리스트 */}
 <MarketList />
            </tbody>
            </Table>
            <hr />
            <div className='booklist-footer'>
     <MarketSearchBar/>
      </div>
         </div>
         </FormDiv>
     </div>
     </>
    )
};

export default MarketPage;
