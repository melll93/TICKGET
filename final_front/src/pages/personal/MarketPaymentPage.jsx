  /* 은영 결제페이지 수정중 */

  import React, { useCallback, useEffect, useState } from "react";
  import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
  import { useLocation, useNavigate, useParams } from "react-router-dom";
  import styled from "styled-components";
  import { mk_boardDetailDB } from "../../axios/board/market/marketLogic";
  import Header from "../../components/Header";
  import Sidebar from "../../components/Sidebar";
  import { MyInput, MyLabel, MyLabelAb } from "../../styles/formStyle";
  import { loadTossPayments } from "@tosspayments/payment-sdk";
  import { handlePayment } from "../../components/handlePayment";
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


    setMkpDetails ({
  /*    board_mk_no : jsonDoc[0].boardMkNo,  글 번호 사용 보류*/
  /*     board_mk_title : jsonDoc[0].boardMkTitle,
      mk_ticket_place : jsonDoc[0].mkTicketPlace, 
      mk_ticket_date : jsonDoc[0].mkTicketDate,  
      mk_ticket_seat : jsonDoc[0].mkTicketSeat,  
      board_mk_filename : jsonDoc[0].boardMkFilename, 
      board_mk_fileurl : jsonDoc[0].boardMkFileurl,  

      mk_ticket_count : jsonDoc[0].mkTicketCount, 
      mk_ticket_price : jsonDoc[0].mkTicketPrice.toLocaleString(), 
      ticketPrice : jsonDoc[0].mkTicketPrice  */

      url : jsonDoc[0].boardMkFileurl,
      title : jsonDoc[0].boardMkTitle,
      seat : jsonDoc[0].mkTicketSeat,
      date : jsonDoc[0].mkTicketDate,
      place : jsonDoc[0].mkTicketPlace,
      amount : jsonDoc[0].mkTicketCount,
      price : jsonDoc[0].mkTicketPrice
    })
    }
    boardDetail()
  },[])







  /* 
  const handleClick = async () => {
      const tossPayments = await loadTossPayments(
        // process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
        'test_ck_aBX7zk2yd8yjXw0pyNE3x9POLqKQ' //clientKey
      );
      await tossPayments.requestPayment("", {   //첫번째 파라미터 - 카드, 가상계좌, 계좌이체, 휴대폰, 문화상품권, 도서문화상품권, 게임문화상품권 가능  // 두번째 파라미터-결제정보
        amount: mkpDetail.ticketPrice,   //
        orderId: 'KjnHngSBVHXivyFnT4bMd',  //영문 대소문자, 숫자, 특수문자-,_,= 사용가능 (6~64자 이하 문자열)
        orderName: mkpDetail.board_mk_title,  // 주문명 - 상품정보
        customerName: 'member_name',  // *회원이름으로 수정해야함 (세션스토리지에서 가져옴)
        successUrl: `${window.location.origin}/paymentsucess/:festMId`,  // 성공시 리다이렉트 URL 
        failUrl: `${window.location.origin}/paymentfailed/:festMId`,  //실패시 리다이렉트 URL - 안만들어놈
        flowMode: 'DEFAULT',
        easyPay: '토스페이'
        // windowTarget:'self'
        // customerEmail:''  //결제결과 확인 이메일 발송 - 회원이메일(세션스토리지에서 가져옴)
      }).catch(function (error) {
        if (error.code === 'USER_CANCEL') {     // 결제 고객이 결제창을 닫았을 때 에러

        } else if (error.code === 'INVALID_CARD_COMPANY') {        // 유효하지 않은 카드  에러
        }
      });
    };
  */


    return (
      <>
      <Header/>
        <Sidebar />
        <div className="center">
        <PaymentPage orderDetail={mkpDetail} /* paymentData={paymentData} */ />
        </div>
      </>
    );
  };
  export default MarketPaymentPage;
