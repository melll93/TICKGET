/* 은영 수정중  - 리뷰 컴포로 쪼개는중 */
import { async } from '@firebase/util';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Tab, Tabs } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { DeleteFestivalDB, DeleteFestReviewDB, FestivalReviewDB, FestReviewInsertDB, UpdateFestReviewDB } from '../../axios/main/Festival';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { BButton, MyButton, MyInput, MyLabel, MyLabelAb } from '../../styles/formStyle';
import '../../styles/productsdetails.css'
import FestivalReviewComponent from './FestivalReviewComponent';

function ProductsDetails(){
    let {festMId} =useParams();
    const navigate = useNavigate();
  
    const reduxUser = useSelector(state => state.userStatus.user);
    console.log(reduxUser)



/* 상품삭제 */
const deleteProducts=async()=>{
const festival={
  fest_m_id:festMId,
}
const res = await DeleteFestivalDB(festival)
console.log(festival)
if(!res.data){
}
else{
}
navigate(-1)
console.log(festMId)
}


    
    return(
      <>
      <Sidebar />
      <div className="center">
      출력{festMId}
       {/* 출력{Data} */}
        <Header />
        <h2>상품 상세페이지....</h2>
        
  {/* 로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람이 관리자일경우 삭제 버튼 보이기 
   {sessionStorage.getItem('Auth')===''관리자"'&&       
   */}
  <div>
                <BButton style={{width:"200px", height:"38px", backgroundColor:'black' }} onClick={deleteProducts} >상품삭제(누르지마세요.)</BButton>
</div>


<div className="totalcontainer"> 
{/* //////////////////////////////////////탑 섹션///////////////////////////////////////////////////////////////////// */}
<section>
        <div className="topcontainer" >
                               <div className="product_detail_imgdiv">
                                         <img className="product_detail_img" src={'../images_key/WOONGS.jpg'}  alt="상품사진" />
                               </div>
                               <div className="product_detail_info">
                               <div className="product_detail_head">
                                <h3 className="product_title">타이틀 및 상세 설명 여기</h3>
                                <p className="product_sub_title">subtitle</p>
                                </div>
                                <div className="product_info" ></div>
                                <ul className="product_lnfo_list_col2">
                                <li className="product_info_list"><span className="product_info_title">장소</span><div className="product_info_desc">fest_location</div></li>
                                <li className="product_info_list"><span className="product_info_title">관람시간</span><div className="product_info_desc">fest_runtime</div></li>
                                <li className="product_info_list"><span className="product_info_title">기간</span><div className="product_info_desc">fest_startdate~fest_enddate</div></li>
                               <li className="product_info_list"><span className="product_info_title">관람등급</span><div className="product_info_desc">fest_age</div></li>
                                </ul>
                     <ul className="product_lnfo_list_col2">
                                <li className="product_info_list"><span className="product_info_title">가격</span><div className="product_info_desc"><ul className="product_info_sublist"><li className="product_info_subitem">일반석<em className="text_emphasis"> fest_price </em>원</li></ul></div></li>
                                <li className="product_info_list"><span className="product_info_title">할인</span><div className="product_info_desc"><ul className="product_info_sublist"><li className="product_info_subitem">신한카드<em className="text_emphasis"> %%%% </em>할인</li></ul></div></li>
 </ul>
                               </div>
        </div>
</section>
{/* //////////////////////////////////////미드 섹션////////////////////////////////////////////////////////////////// */}

<section>
<div className="midContainerCalendarAndRestSeats">
                   <span className="calendar">
                    <Calendar/>
</span>
<span className="calendarands1">
내용물1
</span>
<span className="calendarands2">
잔여좌석<br></br>
<Button className="researvebtn" onClick={() => navigate("/payment/"+festMId)}>예매하기</Button>

</span>
</div>
</section>
{/* ////////////////////////////////////// 바텀 섹션///////////////////////////////////////////////////////////////////// */}
<section>
  <div className="bottomcontainer" style={{marginLeft:'220px'}}>
<Tabs style={{maxWidth:'1200px'}}
          defaultActiveKey="product_detail_description"
          id="justify-tab-example"
          className="product_detail_tabs"
          justify
        >
          <Tab eventKey="product_detail_description" title="상세정보">
            상품상세정보 - img src 예정
            <div className="product_detail_description"  style={{maxWidth:'1250px', height:'1000px', border: '1px solid red'}}>

            </div>
          </Tab>
          <Tab eventKey="product_detail_review" title="상품리뷰">
리뷰리뷰
<FestivalReviewComponent></FestivalReviewComponent>

          </Tab>
</Tabs>
</div>  {/* bottom container */}
</section>
      </div>   {/* totalcontainer div */}
</div>   {/* center div */}
       

       </>
    )
  }

export default ProductsDetails;