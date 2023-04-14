import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { handlePayment } from '../../components/handlePayment'

const PaymentPage = ({orderDetail, paymentData}) => {
   const navigate = useNavigate()

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
      <Card.img src={orderDetail.board_mk_fileurl}/>
      <div style={{ marginLeft: '50px' , textAlign:'center' }}>
     <div style={{ display: 'inline-block' , marginTop:'30px' }}>
       <Card.Title style={{  fontSize: '24px'}}>{/* 상품명 */}{orderDetail.board_mk_title}</Card.Title>
     </div>
     <div>
       <Card.Text style={{ fontSize: '20px'  }}>
         {/* 좌석정보 | 공연일 | 공연장소 */}
        {orderDetail.mk_ticket_seat}  |  {orderDetail.mk_ticket_date}  |  {orderDetail.mk_ticket_place}
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
         수량 <span style={{marginLeft:'400px'}}>{orderDetail.mk_ticket_count}장</span></Card.Text>
     </div>
     <hr/>
     <div>
       <Card.Title style={{ fontSize: '24px' , fontWeight:'bold' , opacity:'0.9'}}>
         결제 금액 <span style={{marginLeft:'320px', color:'red'}}>{orderDetail.mk_ticket_price} 원</span></Card.Title>
     </div>
     <hr style={{ opacity: '0.0' }} />
   </div>
 </Card.Body>
</Card>
<div>
<Button style={{width:'400px'}} onClick={handlePayment(paymentData)}>토스 결제하기</Button>
{/* <PaymentComponent /> */}
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
