import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { handlePayment } from '../../components/handlePayment'

const Cimg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;


/* 
To.성훈  
쓰는 페이먼트 페이지에  orderDetail 요렇게 넘기면 안터질거얌....
const orderDetail={
  url:board_mk_fileurl,
  title:board_mk_title,
  seat : mk_ticket_seat,
  date:mk_ticket_date,
  place:mk_ticket_place,
  amount:mk_ticket_count,
  price:mk_ticket_price
}
 */


const PaymentPage = ({orderDetail}) => {
/*   console.log(paymentData)
  console.log(orderDetail); */
   const navigate = useNavigate()
   let totalPrice = orderDetail.amount*orderDetail.price
let {no}=useParams()

const paymentData={
  amount:orderDetail.amount,
  orderId:'assdasdadsad',
  orderName:orderDetail.title,
  customerName:"mem_id예정",
  no,
}

  return (
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
      <Cimg src={orderDetail.url}/>
      <div style={{ marginLeft: '50px' , textAlign:'center' }}>
     <div style={{ display: 'inline-block' , marginTop:'30px' }}>
       <Card.Title style={{  fontSize: '24px'}}>{/* 상품명 */}{orderDetail.title}</Card.Title>
     </div>
     <div>
       <Card.Text style={{ fontSize: '20px'  }}>
         {/* 좌석정보 | 공연일 | 공연장소 */}
        좌석정보(수정예정){orderDetail.seat}  |  {orderDetail.date}  |  {orderDetail.place}
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
         수량 <span style={{marginLeft:'400px', color:'black'}}>{orderDetail.amount}장</span></Card.Text>
     </div>
     <hr/>
     <div>
       <Card.Title style={{ fontSize: '24px' , fontWeight:'bold' , opacity:'0.9'}}>
         결제 금액 <span style={{marginLeft:'320px', color:'red'}}>{totalPrice} 원</span></Card.Title>
     </div>
     <hr style={{ opacity: '0.0' }} />
   </div>
 </Card.Body>
</Card>
<div>
<Button style={{width:'400px'}} onClick={()=>{handlePayment(paymentData)}}>토스 결제하기</Button>
{/* <Button className="researvebtn" onClick={MarketPaymentComponent}>토스페이 결제하기</Button> */}
<Button style={{width:'400px'}} onClick={() => navigate(-1)}>취소/이전으로</Button>
</div>
</section>
   </div>
</div> {/* paymentDiv 끝 */}
  
   </div>
  )
}

export default PaymentPage
