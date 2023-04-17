import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormDiv, HeaderDiv, MkFormDiv } from "../../styles/formStyle";
import MarketList from "../board/market/MarketList";
import MarketSearchBar from "../board/market/MarketSearchBar";
import { Cookies } from "react-cookie";
const cookies = new Cookies();


const MarketPage = () => {

  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

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
      <div className="center">
        <HeaderDiv>
          <div style={{display: "flex" , alignItems: "center"}}>
          <h3 style={{marginRight:"auto"}}>마켓 게시판
          </h3>
          <MarketSearchBar />
          </div>
          {/*          <Button variant="primary" style={{marginLeft:'700px'}}>
                  전체조회
          </Button>
          <Button variant="primary" onClick={()=>navigate('/market/write')}  style={{marginRight:'80px'}}>
                  글쓰기
            </Button> */}
        </HeaderDiv>
        <MkFormDiv style={{ marginLeft: "200px" }}>
          <div>
          </div>
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
            <div className="booklist-footer">
            
            </div>
          </div>
        </MkFormDiv>
      </div>
    </>
  );
};

export default MarketPage;
