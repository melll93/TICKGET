  /* 은영 결제페이지 수정중 */
  import React, { useCallback, useEffect, useState } from "react";
  import { useLocation, useNavigate} from "react-router-dom";
  import styled from "styled-components";
  import { mk_boardDetailDB } from "../../axios/board/market/marketLogic";
  import Header from "../../components/Header";
  import Sidebar from "../../components/Sidebar";
  import PaymentPage from "./PaymentPage";

  const Cimg = styled.img`
  width:150px;
  height:150px;
  object-fit:cover;
  `

  const MarketPaymentPage = () => {
    const href = window.location.href; //url 주소 전체 가져옴
    console.log(href);
    const loc = useLocation().pathname.split("/").pop()
    console.log(loc);
    /* const no = href.split("/").pop(); // 슬래시 별로 분리해서 마지막 요소(글번호)를 가져옴
    console.log(no); */

    const navigate = useNavigate();
    const [mkpDetail,setMkpDetails] = useState([])



      

  useEffect(() => {
    const boardDetail = async() => {
    const board = {
      boardMkNo : loc, //해당 글번호로 게시글정보(판매티켓정보) 가져옴
    }

    const res = await mk_boardDetailDB(board);
    console.log(res.data)
    const temp = JSON.stringify(res.data)
    const jsonDoc = JSON.parse(temp)
    console.log(jsonDoc[0])
    const date = new Date(jsonDoc[0].mkTicketDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}시 ${minutes}분`;
    console.log(formattedDate); 

    setMkpDetails ({
      no: jsonDoc[0].boardMkNo,  //글 번호 사용 보류*/
      url : jsonDoc[0].boardMkFileurl,
      title : jsonDoc[0].boardMkTitle,
      seat : jsonDoc[0].mkTicketSeat,
      date : formattedDate,
      place : jsonDoc[0].mkTicketPlace,
      amount : jsonDoc[0].mkTicketCount,
      price : jsonDoc[0].mkTicketPrice
    })
    }
    boardDetail()
  },[])



    return (
      <>
      <Header/>
        <Sidebar />
        <div className="center">
        <PaymentPage orderDetail={mkpDetail} />
        </div>
      </>
    );
  };
  export default MarketPaymentPage;
