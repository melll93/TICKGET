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
          <h3 style={{display:'inline-block' , fontFamily:"Nanum Gothic", fontWeight:"bold", marginTop:'50px', marginBottom:'30px'}}>마켓 게시판</h3>
          <MarketSearchBar style={{display: 'inline-block'}}/>
        </div>


        <MkFormDiv style={{ marginLeft: "160px" }}>
          <div className="book-list">
            <MarketList />
          </div>
        </MkFormDiv>
   
        
    </>
  );
};

export default MarketPage;
