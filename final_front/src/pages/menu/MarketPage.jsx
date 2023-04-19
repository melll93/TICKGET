import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormDiv, HeaderDiv, MkFormDiv } from "../../styles/formStyle";
import MarketList from "../board/market/MarketList";
import MarketSearchBar from "../board/market/MarketSearchBar";
import { Cookies } from "react-cookie";
import Footer from "../../components/Footer";
import CommonPagination from "../../components/CommonPagination";
import { mk_boardListDB } from "../../axios/board/market/marketLogic";
const cookies = new Cookies();


const MarketPage = () => {

  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);


  //페이지네이션 처리
  const [page, setPage] = useState(1);
  const [perPage] = useState(15);
  
  useEffect(() => {
    selectBoardList();
  }, []);

  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentMkBoard = (boardList) => {
    let currentFest = 0;
    currentFest = boardList.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  
  const selectBoardList = async () => {
    const res = await mk_boardListDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

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
        <Header />
      <Sidebar />
        <HeaderDiv style={{marginLeft:'600px'}}>
        </HeaderDiv>


        <div style={{marginTop:'100px' , textAlign: 'center'}}>
          <h3 style={{display:'inline-block' , fontFamily:"Nanum Gothic", fontWeight:"bold"}}>마켓 게시판</h3>
          <MarketSearchBar style={{display: 'inline-block'}}/>
        </div>


        <MkFormDiv style={{ marginLeft: "200px" }}>
          <div className="book-list">
         {/*    <Table striped bordered hover style={{ minWidth: "1000px" }}>
              <thead>
                <tr>
                  <th style={{ width: "500px", textAlign: "center" }}>
                    상품정보
                  </th>
                  <th style={{ width: "50px", textAlign: "center" }}>수량</th>
                  <th style={{ width: "150px", textAlign: "center" }}>가격</th>
                  <th style={{ width: "150px", textAlign: "center" }}>
                    등록일
                  </th>
                  <th style={{ width: "150px", textAlign: "center" }}>
                    작성자
                  </th>
                  <th style={{ width: "80px", textAlign: "center" }}>
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                <MarketList />
              </tbody>
            </Table>
            <hr /> */}


            <MarketList />
          </div>
          <CommonPagination
          pagination={setPage}
          perPage={perPage}
          totalItems={boardList.length}
        ></CommonPagination>
        </MkFormDiv>
   
        
    </>
  );
};

export default MarketPage;
