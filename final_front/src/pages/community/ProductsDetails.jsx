/* 은영 수정중  */
import { useEffect, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import Calendar from 'react-calendar';
import {Link, useNavigate, useParams} from 'react-router-dom'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../../styles/productsdetails.css'

function ProductsDetails(props){
    let {id} =useParams();
    const [value, onChange] = useState(new Date());
    const [mark, setMark] = useState([]);
    const navigate = useNavigate();
    const insertReview=()=>{
/* 리뷰등록 요기  */

    }

//리뷰컴포
const ReviewInsert = ()=>{

  return(
    <>
<div className="product_detail_review_comment" style={{borderBottom:'1px solid lightgray', width:'1100px', margin:'50px'}}>
내용<br/>
{/* 여기 인서트  */}
id:  , 날짜...?
</div>


    </>
  )
}


    console.log(id)
    return(
      <>
      <Sidebar />
      <div className="center">
        <Header />
        <h2>상품 상세페이지....</h2>


<div className="totalcontainer"> 
{/* //////////////////////////////////////탑 섹션/////////////////////////// */}
<section>
        <div className="topcontainer" >
                               <div className="product_detail_imgdiv">
                                         <img className="product_detail_img" src={'../images_key/fev'+[props.festId]+[id]+'.PNG'}  alt="상품사진" />
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
{/* //////////////////////////////////////미드 섹션/////////////////////////// */}

<section>
<div className="midContainerCalendarAndRestSeats">
                   <span className="calendar">
                    <Calendar
// onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
//   // formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
//   value={value}
//   minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//   maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//   navigationLabel={null}
//   showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
//   className="mx-auto w-full text-sm border-b"
//   tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
//     // 추가할 html 태그를 변수 초기화
//     let html = [];
//     // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
//     // if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
//     //   html.push(<div className="dot"></div>);
//     // }
//     // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
//     return (
//       <>
//         <div className="flex justify-center items-center absoluteDiv">
//           {html}
//         </div>
//       </>
//     );       ***yarn add moment   //  import moment from "moment";
//   }}
/>
</span>
<span className="calendarands1">
내용물1
</span>
<span className="calendarands2">
잔여좌석<br></br>
<button className="researvebtn" onClick={()=>{navigate("/payment/"+[id])}}> 예약하기 </button> 
</span>
</div>
</section>
{/* ////////////////////////////////////// 바텀 섹션/////////////////////////// */}
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
          <div className="product_detail_review" style={{maxWidth:'1250px', height:'1000px', border: '1px solid red'}}>

<div className="product_detail_review_heading"  style={{margin:'50px', borderBottom:'1px solid black'}}>
<h3>관람 후기</h3>
</div>


          <div className="form-floating" style={{textAlign:'right'}}>
  <textarea className="form-control" placeholder="Leave a comment here" id="product_detail_review_textarea" style={{height: '300px', margin:'10px', maxWidth:'1200px'}}></textarea>
  <label htmlFor="floatingTextarea">관람후기</label>
<button className="reviewbtn" onClick={()=> {}} style={{backgroundColor:'black', width:'250px', height:'50px', color:'white', margin:'10px 80px 10px 10px'}}> 등록 </button> 

</div>

<ReviewInsert></ReviewInsert>



          </div>
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