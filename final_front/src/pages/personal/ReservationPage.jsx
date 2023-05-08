import React, { useEffect, useState } from 'react'
import TicketCancleInfo from '../../components/mypage/TicketCancleInfo'
import Footer from '../../components/Footer'
import { Cookies } from 'react-cookie';
import { searchForMypageDB } from '../../axios/festival/search/search';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
    const cookies = new Cookies();
const _userData = cookies.get("_userData"); //유저 정보
const [memIdData, setMemIdData]=useState([]);
const navigate = useNavigate();

useEffect(() => {
    if(!_userData){
        alert('로그인 후 이용가능합니다.')
        navigate(-1)
    }else{
            const memid = _userData.memberId
            async function searchByMemidList() {
                const data = await searchForMypageDB(memid);
            setMemIdData(data)
            console.log(data);
        }
        searchByMemidList();
    }
      },[]);
    
      const clickeddd = (e, festMId, cpNo, boardMkNo) =>{
        e.preventDefault();
        if(festMId){
            navigate(`../productsDetail/${festMId}`)
        } else if(cpNo){
            navigate(`../carpool/carpoolDetail/${cpNo}`)
        } else{
            navigate(`../market/mk_boardDetail?no=${boardMkNo}`)  
        }
        
    }
    
    return (
    <>
    <section className="cart_main_section">
          <div className="main_left_div">



 </div>   {/* main_left_div */}
<div className="main_center_div">
<h1 className="top_line" style={{fontWeight:'bold'}}>
<i class="bi bi-pencil-square"></i>{" "}
  내 게시글 확인
</h1>



<div className="cart_table_div">

<table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col"></th>
      <th scope="col">카테고리</th>
      <th scope="col">글제목</th>
      <th scope="col">작성일시</th>
      <th scope="col">게시글관리</th>
    </tr>
  </thead>
  <tbody>

{/* 맵돌려야징 */}
  {memIdData && memIdData.map((item, i) => {
      return (
          <tr key={i} style={{fontWeight:'bold'}}>
      <th scope="row">{i+1}</th>
      <td>{item.festMName? (<p>FESTIVAL</p>): item.boardCpTitle? (<p>Board</p>): (<p>MARKET</p>)}</td>
      <td>{item.boardMkTitle? item.boardMkTitle: item.festMName? item.festMName: item.boardCpTitle}</td>
      <td>{item.boardMkTitle? (<p style={{color:'red'}}>확인불가</p>): item.festMName? item.festMRegdate: item.boardCpDate}</td>
      <td><button className="mypage_btn" onClick={(e) => clickeddd(e, item.festMId, item.boardCpNo, item.boardMkNo)}>삭제/수정</button>
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