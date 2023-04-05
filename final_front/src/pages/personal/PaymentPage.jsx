/* 은영 결제페이지 수정중 */

import React, { useCallback, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MyInput, MyLabel, MyLabelAb } from "../../styles/formStyle";
import PaymentComponent from "./PaymentComponent";

const PaymentPage = () => {
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
      결제페이지_ 은영 수정중
      {/* ----------------------------------결제페이지---------------------------------- */}
      
      
      <section className="topsection"></section>

      <section className="midsection">
      <div className="paymentDiv" style={{display:"center", margin:"80px 150px 150px 150px", }}>


{/* 이름 */}
<div style={{display:"flex"}}>
<h4>티켓 구매 수량 </h4>
<DropdownButton id="dropdown_basic_button" title="0" onSelect={(eventKey)=>{}}>
<Dropdown.Item eventKey="item1">1</Dropdown.Item>
<Dropdown.Item eventKey="item2">2</Dropdown.Item>
<Dropdown.Item eventKey="item3">3</Dropdown.Item>
<Dropdown.Item eventKey="item4">4</Dropdown.Item>
<Dropdown.Item eventKey="item5">5</Dropdown.Item>
<Dropdown.Item eventKey="item6">6</Dropdown.Item>
<Dropdown.Item eventKey="item7">7</Dropdown.Item>
</DropdownButton><h4>매</h4>
   </div>

<div style={{display:'flex', marginTop:'30px'}}> 
     <MyLabel style={{flex:'1'}}> 이름 <span style={{color:"red"}}>*</span>
       <MyInput style={{flex:'1', width:'90%'}} type="text" id="name" defaultValue='userName' placeholder="이름을 입력해주세요" />
       <MyLabelAb>ㅇㅇㅇㅇ</MyLabelAb>
   </MyLabel>
   {/* 전화번호 */}
   <MyLabel style={{flex:'1'}}> 전화번호 <span style={{color:"red"}}>*</span>
     <MyInput style={{width:'100%'}} type="text" id="mobile" defaultValue='userTel' placeholder="전화번호를 입력해주세요" 
     />
     <MyLabelAb>ㅇㅇㅇㅇ</MyLabelAb>
   </MyLabel>
     </div>
   {/* 이메일 */}
   <MyLabel> 이메일 <span style={{color:"red"}}>*</span>
     <MyInput style={{width:'100%'}} type="email" id="email" placeholder="이메일를 입력해주세요" />
     <MyLabelAb>ㅇㅇㅇ</MyLabelAb>
   </MyLabel>

   <div className="input-group mb-3">
<input type="text" className="form-control" placeholder="email" aria-label="Username"/>
<span className="input-group-text">@</span>
<input type="text" className="form-control" placeholder="gmail.com" aria-label="Server" />
</div>

<div className="form-floating">
<input type="number" className="form-control" id="tAmo"  onChange={(e)=>{inputTAmo (e.target.value)}}/>
<label htmlFor="floatingInput">구매 수량</label>
</div><br />

<div className="form-floating mb-3">
<input type="text" className="form-control" id="mName" onChange={(e)=>{inputMName(e.target.value)}} />
<label htmlFor="floatingInput"> mName </label>
</div><br/>

<div className="form-floating mb-3">
<input type="text" className="form-control" id="mEmail" onChange={(e)=>{inputMEmail(e.target.value)}} />
<label htmlFor="floatingInput"> mEmail </label>
</div><br/>

     <div className="form-floating">
<input type="number" className="form-control" id="mTel" name="tel" onChange={(e)=>{inputMTel (e.target.value)}}/>
<label htmlFor="floatingInput">mTel</label>
</div><br />

<PaymentComponent></PaymentComponent>

</div> {/* paymentDiv 끝 */}
</section>  {/* midSection 끝 */}
     
     
      
<section className="bottomsection"> </section>
      
      
      
      
      </div>
    </>
  );
};
export default PaymentPage;
