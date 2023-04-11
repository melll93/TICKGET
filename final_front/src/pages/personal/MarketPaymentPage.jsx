/* 은영 결제페이지 수정중 */

import React, { useCallback, useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MyInput, MyLabel, MyLabelAb } from "../../styles/formStyle";
import PaymentComponent from "./PaymentComponent";


const Cimg = styled.img`
width:150px;
height:150px;
object-fit:cover;
`

const MarketPaymentPage = () => {
  let {festMId} =useParams();
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  const navigate = useNavigate();
  const [mTel, setMTel]=useState("");
  const [mName, setMName]=useState("");
  const [mEmail, setMEmail]=useState("");
  const [tAmo, setTamo]=useState(0);



  const inputMTel = useCallback((e) => {
    // setMTel (e)
  },[])
  const inputMName = useCallback((e) => {
    //setMName (e)
  },[])
  const inputMEmail = useCallback((e) => {
    //setMEmail (e)
  },[])
  const inputTAmo = useCallback((e) => {
   // setTamo (e)
  },[])


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
<form style={{marginTop:'5px'}}>
   {/*  상품 정보 섹션  */}
      <h3 style={{ fontWeight: 'bold' }}>◽상품 정보</h3>
   <section>
   <Card style={{width:'800px' , height:'200px' , border:'2px solid' , borderColor:''}}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
         <Cimg src={'https://res.cloudinary.com/finalprojectkh1128/image/upload/v1681105206/iggoqs4opkjzxnpnv6ck.jpg'}/>
         <div style={{ marginLeft: '20px' }}>
        <div style={{ display: 'inline-block' , marginTop:'30px' }}>
          <Card.Title style={{  fontSize: '24px'}}>상품명</Card.Title>
        </div>
        <div>
          <Card.Text style={{ fontSize: '20px'  }}>
            좌석 정보 | 공연일 | 장소
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
   <Card style={{width:'800px' , height:'150px' , border:'2px solid', borderColor:'' }}>
   <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
    </Card.Body>
  </Card>
</section>



 {/*  결제 정보 섹션  */}
<h3 style={{ fontWeight: 'bold', marginTop:'80px' }}>◽결제 정보</h3>
   <section style={{ justifyContent: 'space-between'}}>
   <Card style={{width:'800px' , height:'150px' , border:'2px solid' , borderColor:'' 
   ,display: 'flex' ,  justifyContent:'space-between'}}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
         <div style={{ marginLeft: '20px' }}>
        <div style={{ display: 'inline-block' , marginTop:'20px' }}>
          <Card.Title style={{  fontSize: '22px'}}>수량</Card.Title>
        </div>
        <div>
          <Card.Text style={{ fontSize: '24px'  }}>
            결제 금액
          </Card.Text>
        </div>
        <hr style={{ opacity: '0.0' }} />
      </div>
    </Card.Body>
  </Card>
  <div>
<PaymentComponent />
<Button className="researvebtn" onClick={() => navigate(-1)}>취소/이전으로</Button>
  </div>
</section>







      </form>
</div> {/* paymentDiv 끝 */}
     
     
      
      
      
      
      
      </div>
    </>
  );
};
export default MarketPaymentPage;
