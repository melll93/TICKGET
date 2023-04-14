/* 은영 결제페이지 수정중 */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { mk_boardDetailDB } from "../../axios/market/marketLogic";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MyInput, MyLabel, MyLabelAb } from "../../styles/formStyle";
import PaymentComponent from "./PaymentComponent";
import { loadTossPayments } from "@tosspayments/payment-sdk";


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
   /*  상품 정보  */
    board_mk_title : jsonDoc[0].boardMkTitle, /* 상품제목  */
    mk_ticket_place : jsonDoc[0].mkTicketPlace, /* 상품 공연 장소  */
    mk_ticket_date : jsonDoc[0].mkTicketDate,  /* 상품 공연일  */
    mk_ticket_seat : jsonDoc[0].mkTicketSeat,  /* 상품 좌석정보  */
    board_mk_filename : jsonDoc[0].boardMkFilename, /* 상품 이미지 */
    board_mk_fileurl : jsonDoc[0].boardMkFileurl,  /* 상품 이미지 */

  /* 결제 정보 */
    mk_ticket_count : jsonDoc[0].mkTicketCount, /* 상품 수량  */
    mk_ticket_price : jsonDoc[0].mkTicketPrice.toLocaleString(), /* 결제 금액 (쉼표붙임->문자열) */
    ticketPrice : jsonDoc[0].mkTicketPrice /* 토스페이먼츠로 넘길 금액 (숫자형) */
  })
  }
  boardDetail()
},[])





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



  return (
    <>
        <Header />
      <Sidebar />
      <div className="center">
      {/* ----------------------------------결제페이지---------------------------------- */}
      
      

      <div className="paymentDiv" style={{display:"center", margin:"80px 150px 150px 150px", }}>
      <div style={{display:"flex" , marginBottom:'30px'}}>
<h2>결제하기</h2>
   </div>
<div style={{marginTop:'5px'}}>
   {/*  상품 정보 섹션  */}
      <h3 style={{ fontWeight: 'bold' }}>◽상품 정보</h3>
   <section>
   <Card style={{width:'800px' , height:'200px' , border:'2px solid' , borderColor:'' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' , marginLeft:'100px' }}>
         <Cimg src={mkpDetail.board_mk_fileurl}/>
         <div style={{ marginLeft: '50px' , textAlign:'center' }}>
        <div style={{ display: 'inline-block' , marginTop:'30px' }}>
          <Card.Title style={{  fontSize: '24px'}}>{/* 상품명 */}{mkpDetail.board_mk_title}</Card.Title>
        </div>
        <div>
          <Card.Text style={{ fontSize: '20px'  }}>
            {/* 좌석정보 | 공연일 | 공연장소 */}
           {mkpDetail.mk_ticket_seat}  |  {mkpDetail.mk_ticket_date}  |  {mkpDetail.mk_ticket_place}
          </Card.Text>
        </div>
        <hr style={{ opacity: '0.0' }} />
      </div>
    </Card.Body>
  </Card>
</section>
 



 {/*  구매자 정보 섹션  */}
 <h3 style={{ fontWeight: 'bold', marginTop:'40px' }}>◽구매자 정보</h3>
   <section>
   <Card style={{width:'800px' , height:'150px' , border:'2px solid', borderColor:'', alignItems: 'center' }}>
   <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
   <div style={{ marginLeft: '20px' }}>
        <div style={{ display: 'inline-block' , marginTop:'20px' }}>
          <Card.Text style={{  fontSize: '20px'}}>회원 이름</Card.Text>
        </div>
        <div>
          <Card.Text style={{ fontSize: '20px',marginTop:'10px'  }}>
            회원 이메일
          </Card.Text>
        </div>
        <hr style={{ opacity: '0.0' }} />
      </div>
    </Card.Body>
  </Card>
</section>



 {/*  결제 정보 섹션  */}
<h3 style={{ fontWeight: 'bold', marginTop:'80px' }}>◽결제 정보</h3>
   <section style={{  justifyContent: 'space-between'}}>
   <Card style={{width:'800px' , height:'150px' , border:'2px solid' , borderColor:'' 
   ,display: 'flex' ,  alignItems:'center'}}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
         <div style={{ marginLeft: '20px' }}>
        <div style={{ display: 'inline-block' , marginTop:'10px' }}>
          <Card.Text style={{  fontSize: '22px'}}>
            수량 <span style={{marginLeft:'400px'}}>{mkpDetail.mk_ticket_count}장</span></Card.Text>
        </div>
        <hr/>
        <div>
          <Card.Title style={{ fontSize: '24px' , fontWeight:'bold' , opacity:'0.9'}}>
            결제 금액 <span style={{marginLeft:'320px', color:'red'}}>{mkpDetail.mk_ticket_price} 원</span></Card.Title>
        </div>
        <hr style={{ opacity: '0.0' }} />
      </div>
    </Card.Body>
  </Card>
  <div>
  <Button style={{width:'400px'}} onClick={handleClick}>토스 결제하기</Button>
  {/* <PaymentComponent /> */}
{/* <Button className="researvebtn" onClick={MarketPaymentComponent}>토스페이 결제하기</Button> */}
<Button style={{width:'400px'}} onClick={() => navigate(`../market/mk_boardDetail?no=${loc}`)}>취소/이전으로</Button>
  </div>
</section>







      </div>
</div> {/* paymentDiv 끝 */}
     
     
      
      
      
      
      
      </div>
    </>
  );
};
export default MarketPaymentPage;
