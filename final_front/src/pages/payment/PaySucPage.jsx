  import React, { useEffect, useState } from 'react'
  import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
  import Header from '../../components/Header'
  import Sidebar from '../../components/Sidebar'
  import { mk_boardDetailDB, mk_boardSellDB } from '../../axios/board/market/marketLogic'
  import { paymentInsert } from '../../axios/payment/paymentLogic'
  import { Cookies } from 'react-cookie'
import { wishlistSelDelDB, wishlistUpdateStatusDB } from '../../axios/payment/wishlistLogic'
import Footer from '../../components/Footer'

  const cookies = new Cookies();
  const PaySucPage = () => {

    /* 결제 처리에 필요한 회원정보 */ 
    const _userData = cookies.get("_userData");
    const festTcAmt = cookies.get("tk_amount");
    const festTcDate = cookies.get("date");
    
    let member_no;
    let member_name = '';
    let member_email = '';
    if (_userData) {
      member_no = _userData.memberNo;
      member_name = _userData.memberName;
      member_email = _userData.memberEmail;
    }


      let {festMId} = useParams() //라우트 파라미터로 받은 글번호
      const searchParams = new URLSearchParams(useLocation().search);
      
      const orderid = searchParams.get("orderId")
      console.log(orderid) //주문번호
      const price = searchParams.get("amount")
      console.log(price) // 가격
      const no = parseInt(festMId.substring(1))
      console.log(no) //글번호   - 은영 :NaN
      console.log(festMId)    

      
/* 
은영 수정 중......


*/



      //마켓 게시판 게시글일 경우 판매완료 처리 - 결제내역 추가
      useEffect(() => {
        const mkSell = async () => {
if (no){
         const board = {
            boardMkNo: no,
          };
          const res = await mk_boardDetailDB(board);
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
      
          const sellBoard = { //마켓게시판 판매완료 처리
            boardMkNo: jsonDoc[0].boardMkNo,
            mkTicketPrice: jsonDoc[0].mkTicketPrice,
          };
          await mk_boardSellDB(sellBoard);
      

          const wishlistSelled = { //다른 사용자 카트 페이지 상품 상태 업데이트 (판매완료)
            boardMkNo : jsonDoc[0].boardMkNo
          } 
          await wishlistUpdateStatusDB(wishlistSelled)


          const deleteWishlist = { //결제한 상품은 찜한 목록에서 삭제
             boardMkNo : jsonDoc[0].boardMkNo,
             wlistMemberNo : member_no              
          };
          await wishlistSelDelDB(deleteWishlist)


         const payment = { //결제내역 추가
            paymentId: 0,
            paymentOrderId: orderid+jsonDoc[0].boardMkNo,
            paymentOrderName: jsonDoc[0].boardMkTitle,
            paymentCount: jsonDoc[0].mkTicketCount,
            paymentPrice: jsonDoc[0].mkTicketPrice,
            paymentFestDate: jsonDoc[0].mkTicketDate,
            boardMkNo: jsonDoc[0].boardMkNo,
            memberNo: member_no,
            memberName: member_name,
            memberEmail: member_email,
          }; 
          await paymentInsert(payment);
          

        }else{


          const payment2 = { //결제내역 추가
            paymentOrderId: orderid+festMId+member_no,
            paymentOrderName: festMId,
            paymentCount: festTcAmt,
            paymentPrice: price,
            paymentFestDate:festTcDate, 
            boardMkNo: '',
            memberNo: member_no,
            memberName: member_name,
            memberEmail: member_email,
          };
          await paymentInsert(payment2);
          console.log(payment2)
        };
      }
         mkSell(); 
      }, []);




      return (
      <>
          <Header />
              <Sidebar />
        <div className="center">

          <div className="payment_center_div" style={{margin:'100px', textAlign:'center', fontWeight:'bold'}}>
          <i class="bi bi-check-circle" style={{fontSize:"10rem"}}></i>
        <h1  style={{fontWeight:'bold' , color:'rgb(30,220,20)'}}>결제가 정상적으로 처리되었습니다. </h1><br/>
        <h1  style={{fontWeight:'bold',color:'rgb(30,220,20)' ,marginBottom:'20px'}}>감사합니다!</h1><br/>
        <span> 주문 번호 : {` ${searchParams.get("orderId")}`}</span><br/>
        <div>결제 금액 : {` ${Number(searchParams.get("amount")).toLocaleString()}원`}</div><br/>
          <p> 상품 {}의 구매가 완료되었습니다. </p>
          <Link to = "/">
            <button className="homebtn" style={{backgroundColor:'rgb(80,50,200)', color:'white', borderRadius:'30px', width:'450px', height:'60px', marginTop:'10px' , fontFamily:'Nanum-Gothic', fontWeight:'bold', fontSize:'1.2rem'}}> 계속 둘러보기 </button>
            </Link>
          </div>
          <section style={{height:'300px'}}/>
<Footer/>
        </div>
      </>
    )
  }

  export default PaySucPage


