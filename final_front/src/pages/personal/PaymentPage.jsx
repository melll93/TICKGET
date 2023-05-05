import React from 'react'
import { Card } from 'react-bootstrap'
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { PurpleBtn } from '../../styles/formStyle';
import Footer from '../../components/Footer';
import { handlePayment } from '../../util/handlePayment';

const Cimg = styled.img`
   width: 150px;
   height: 150px;
   object-fit: cover;
   `;

const PaymentPage = ({ orderDetail }) => {
   const cookies = new Cookies();
   const _userData = cookies.get("_userData"); //유저 정보
   /*   console.log(paymentData) */
   console.log(_userData)

   console.log(orderDetail);
   const navigate = useNavigate()
   let totalPrice = orderDetail.amount * orderDetail.price

   const paymentData = {
      amount: totalPrice, //가격
      orderId: 'x4PBm2QfOA5oiyJNd638T',    //주문번호
      orderName: orderDetail.title,  //주문명
      customerName: _userData.memberName,     //구매자 이름
      no: orderDetail.no,
   }

   const handleToss = async () => {
      const res = await handlePayment(paymentData)
      console.log(res.data)
   }




   return (
      <div className="center" style={{ marginTop: '-40px' }}>
         {/* ----------------------------------결제페이지---------------------------------- */}
         <div style={{ border: '2px solid gray', width: '1000px', margin: '0 auto', borderRadius: '10px' }}>
            <div className="paymentDiv" style={{ textAlign: "center", margin: "80px 150px 100px 150px", marginBottom: '50px' }}>
               <h2 style={{ margin: '0 auto', marginTop: '-30px', fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "2rem" }}>
                  <i class="bi bi-receipt-cutoff"></i>{""} 결제하기</h2>
               <hr style={{ marginTop: '30px', borderTop: '3px solid rgb(80, 50, 200)' }} />
               <div style={{ display: "flex", marginBottom: '100px', margin: '0 auto' }}>
               </div>
               <div style={{ marginTop: '30px' }}>
                  {/*  상품 정보 섹션  */}
                  <h3 style={{ fontWeight: 'bold' }}><i class="bi bi-clipboard-check"></i>&nbsp;&nbsp;상품 정보</h3>
                  <section style={{ marginLeft: '-50px' }}>
                     <Card style={{ width: '800px', height: '200px', border: '2px solid rgb(224,224,224)', borderColor: '', margin: '0 auto', marginTop: '20px', alignItems: 'center' }}>
                        <Card.Body style={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}>
                           <div style={{ marginRight: '50px' }}>
                              <Cimg src={orderDetail.url} />
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                              <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                 <Card.Title style={{ fontSize: '24px', margin: '0 auto', fontWeight: 'bold' }}>{/* 상품명 */}{orderDetail.title}</Card.Title>
                              </div>
                              <div>
                                 <Card.Text style={{ fontSize: '1.1rem', margin: '0 auto' }}>
                                    {/* 좌석정보 | 공연일 | 공연장소 */}
                                    <p style={{ margin: '0 0 5px 0' }}>{orderDetail.seat}</p>
                                    <p style={{ margin: '0 0 5px 0' }}>{orderDetail.date}</p>
                                    <p style={{ margin: '0' }}>{orderDetail.place}</p>
                                 </Card.Text>
                              </div>
                           </div>
                        </Card.Body>
                     </Card>
                  </section>




                  {/*  구매자 정보 섹션  */}
                  <h3 style={{ fontWeight: 'bold', marginTop: '80px' }}><span><i class="bi bi-person-lines-fill" ></i></span>&nbsp;&nbsp;구매자 정보</h3>
                  <section style={{ justifyContent: 'space-between', marginLeft: '-50px' }}>
                     <Card style={{
                        width: '800px', height: '150px', border: '2px solid rgb(224,224,224)', borderColor: ''
                        , margin: '0 auto', display: 'flex', alignItems: 'center', marginTop: '20px'
                     }}>
                        <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem' }}>
                           <div style={{ marginLeft: '20px' }}>
                              <div style={{ display: 'inline-block', marginTop: '20px' }}>
                                 <Card.Text style={{ fontSize: '22px' }}>
                                    구매자명 <span style={{ marginLeft: '350px', color: 'black' }}>{_userData.memberName}</span></Card.Text>
                              </div>
                              <div>
                                 <Card.Text style={{ fontSize: '22px', marginTop: '10px' }}>
                                    이메일 정보 <span style={{ marginLeft: '200px', color: 'black' }}>{_userData.memberEmail}</span>
                                 </Card.Text>
                              </div>
                              <hr style={{ opacity: '0.0' }} />

                           </div>
                        </Card.Body>
                     </Card>
                  </section>



                  {/*  결제 정보 섹션  */}
                  <h3 style={{ fontWeight: 'bold', marginTop: '80px' }}><i class="bi bi-wallet2"></i>&nbsp;&nbsp;결제 정보</h3>
                  <section style={{ justifyContent: 'space-between', marginLeft: '-50px' }}>
                     <Card style={{
                        width: '800px', height: '150px', border: '2px solid rgb(224,224,224)', borderColor: ''
                        , margin: '0 auto', display: 'flex', alignItems: 'center', marginTop: '20px'
                     }}>
                        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                           <div style={{ marginLeft: '20px' }}>
                              <div style={{ display: 'inline-block', marginTop: '5px' }}>
                                 <Card.Text style={{ fontSize: '22px' }}>
                                    수량 <span style={{ marginLeft: '400px', color: 'black' }}>{orderDetail.amount}{" "}장</span></Card.Text>
                              </div>
                              <hr />
                              <div>
                                 <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    결제 금액 <span style={{ marginLeft: '320px', color: 'red', fontSize: '2rem' }}>{totalPrice} 원</span></Card.Title>
                              </div>
                              <hr style={{ opacity: '0.0' }} />
                           </div>
                        </Card.Body>
                     </Card>
                  </section>
                  <div style={{ marginTop: '30px', marginLeft: '30px', display: 'flex' }}>
                     <br />
                     <PurpleBtn width='500px' onClick={() => { handleToss(paymentData) }}>토스 결제하기</PurpleBtn>
                     {/* <PaymentComponent /> */}
                     {/* <Button className="researvebtn" onClick={MarketPaymentComponent}>토스페이 결제하기</Button> */}
                     <PurpleBtn width='500px' onClick={() => navigate(-1)}>취소/이전으로</PurpleBtn>
                  </div>
               </div>
            </div> {/* paymentDiv 끝 */}
         </div>
         <section style={{ height: '300px' }} />
         <Footer />
      </div>
   )
}

export default PaymentPage


