import React from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import MypageSidebar from "../../components/Mypage/MypageSidebar";
import Sidebar from "../../components/Sidebar";



const SettingPage = () => {
  const navigate=useNavigate()
const before =()=>{
navigate(-1)
}
  
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
<section>
<div style={{display:'flex', textAlign:'center' , alignItems:'center', padding:'50px'}}>
        <MypageSidebar />
        <div className="setting_center_div" style={{margin:'180px'}}>
<h1>정보를 안전하게 보호하기 위해 </h1>
<h1> <span style={{color:'red'}}>  비밀번호를 다시 한번 확인</span>합니다.  </h1><br/>
<h4 >비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요.</h4><br/><br/>
<p> ID :  member_id </p>
<div style={{display:'flex'}}>
<p style={{ marginLeft:'150px'}}> 비밀번호 :</p>
  <input type="password" className="form-control" id="password" style={{width:'300px', marginBottom:'100px'}}/>
</div>
    <button onClick={before} className="homebtn" style={{backgroundColor:'white',  borderRadius:'50px', width:'250px', height:'60px', marginRight:'5px'}}> 취소 </button>
   {/*  <Link to = "#"> */}
    <button className="homebtn" style={{backgroundColor:'black', color:'white', borderRadius:'50px', width:'250px', height:'60px'}}> 확인 </button>
   {/*  </Link> */}
  </div>
</div>
</section>
</div>   {/* center div  끝 */}
    </>
  );
};

export default SettingPage;
