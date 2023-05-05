import React, { useEffect, useState } from 'react'
import TicketCancleInfo from '../../components/mypage/TicketCancleInfo'
import Footer from '../../components/Footer'
import { Cookies } from 'react-cookie';
import { searchForMypageDB } from '../../axios/festival/search/search';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
    const cookies = new Cookies();
const _userData = cookies.get("_userData"); //유저 정보
const memid = _userData.memberId
    const [memIdData, setMemIdData]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function searchByMemidList() {
            const data = await searchForMypageDB(memid);
            setMemIdData(data)
            console.log(data);
        }
        searchByMemidList();
      },[]);
    
      const clickeddd = (e, festMId, cpNo) =>{
        e.preventDefault();
        if(festMId){
            navigate(`../productsDetail/${festMId}`)
        } else if(cpNo){
            navigate(`../carpool/carpoolDetail/${cpNo}`)

        }

      }
    
    return (
    <>
    <section className="cart_main_section">
          <div className="main_left_div">



 </div>   {/* main_left_div */}
<div className="main_center_div">

<h1 className="top_line">
  내 게시글 확인
</h1>



<div className="cart_table_div">

<table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col"></th>
      <th scope="col">글제목</th>
      <th scope="col">작성일시</th>
      <th scope="col">게시글관리</th>
    </tr>
  </thead>
  <tbody>

{/* 맵돌려야징 */}
  {memIdData && memIdData.map((item, i) => {
      return (
          <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{item.festMName? item.festMName: item.boardCpTitle}</td>
      <td>{item.festMName? item.festMRegdate : item.boardCpDate}</td>
      <td><button className="mypage_btn" onClick={(e) => clickeddd(e, item.festMId, item.boardCpNo)}>삭제/수정하러가기</button>
</td>
    </tr>
        );
      })}

{/* 맵돌려야징 */}


  </tbody>
</table>
</div>


<div className="cancle_info">
        <TicketCancleInfo></TicketCancleInfo>
</div>


          </div>  {/* main_center_div */}   

        </section>

    </>
  
    )
}

export default ReservationPage