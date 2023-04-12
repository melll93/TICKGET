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
import MarketPaymentComponent from "./MarketPaymentComponent";


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
    mk_ticket_price : jsonDoc[0].mkTicketPrice, /* 결제 금액  */
   })
  }
  boardDetail()
},[])


 const mkpdata = {
  mkpTitle : mkpDetail.board_mk_title, /* 상품제목 (게시글제목) */
  mkpCustomerName : '회원이름', /* 세션에서 가져오기 */
  mkpCustomerEmail : '회원이메일', /* 세션에서 가져오기 */
  mkpPrice : mkpDetail.mk_ticket_price /* 상품 가격 */ 
 }


  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
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
   <section style={{ justifyContent: 'space-between'}}>
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
            결제 금액 <span style={{marginLeft:'320px', color:'red'}}>{mkpDetail.mk_ticket_price}</span></Card.Title>
        </div>
        <hr style={{ opacity: '0.0' }} />
      </div>
    </Card.Body>
  </Card>
  <div>
  {/* <MarketPaymentComponent></MarketPaymentComponent> */}
  <PaymentComponent/>
{/* <Button className="researvebtn" onClick={MarketPaymentComponent}>토스페이 결제하기</Button> */}
<Button className="researvebtn" onClick={() => navigate(`../market/mk_boardDetail?no=${loc}`)}>취소/이전으로</Button>
  </div>
</section>







      </div>
</div> {/* paymentDiv 끝 */}
     
     
      
      
      
      
      
      </div>
    </>
  );
};
export default MarketPaymentPage;
