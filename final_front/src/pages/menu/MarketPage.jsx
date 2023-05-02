import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HeaderDiv, MkFormDiv } from "../../styles/formStyle";
import MarketList from "../board/market/MarketList";
import MarketSearchBar from "../board/market/MarketSearchBar";
import { Cookies } from "react-cookie";
import Footer from "../../components/Footer";

const cookies = new Cookies();

const MarketPage = () => {

  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

  return (
    <>
        <Header />
      <Sidebar />
        <HeaderDiv style={{marginLeft:'600px'}}>
        </HeaderDiv>
        <div style={{marginTop:'80px' , textAlign: 'center'}}>
          <h3 style={{display:'inline-block' , fontFamily:"Nanum Gothic", fontWeight:"bold", marginTop:'70px', marginBottom:'50px'}}><i class="bi bi-bag"></i>{" "}TICK-GET 마켓</h3>
          <MarketSearchBar style={{display: 'inline-block', marginLeft:'100px'}}/>
        </div>
        <MkFormDiv style={{ marginLeft: "80px" }}>
          <div className="book-list">
            <MarketList />
          </div>
        </MkFormDiv>
        <section style={{height:'300px'}}/>
  <Footer/>
    </>
  );
};

export default MarketPage;