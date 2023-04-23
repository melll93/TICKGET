  import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { mk_pushLikeBtnDB } from '../../../axios/board/market/marketLogic';

const cookies = new Cookies();

  const MarketRow = ({boards}) => {

   //회원 정보
   const _userData = cookies.get("_userData"); 
   /* console.log(_userData) */
 
   let member_no;
   if (_userData) {
     member_no = _userData.memberNo; //쿠키에서 가져온 회원번호 (내정보)
   }
 

 
    console.log(boards); // 마켓 게시판 조회 데이터
    const navigate = useNavigate()

    //카드태그 호버 처리
    const [hovered, setHovered] = useState(false)

    //가격 쉼표 처리
    const price = boards.mkTicketPrice.toLocaleString()
    console.log(price)


    //현재 시간 - 게시글 작성 시간
    const now = new Date();
    const boardMkDateTime = new Date(boards.boardMkDate)
    const diffInMs = now - boardMkDateTime;
   /*  console.log(diffInMs) */
       
   

    //작성일 태그에 적용
      const formatTimeDiff = (diffInMs) =>{
        const seconds = Math.floor(diffInMs / 1000)
        if (seconds < 60) {
          return `${seconds}초 전`;
        } else {
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) {
            return `${minutes}분 전`;
          } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
              return `${hours}시간 전`;
            } else {
              const days = Math.floor(hours / 24);
              if (days < 30) {
                return `${days}일 전`;
              } else {
                const months = Math.floor(days / 30);
                if (months < 12) {
                  return `${months}개월 전`;
                } else {
                  const years = Math.floor(months / 12);
                  return `${years}년 전`;
                }
              }
            }
          }
        }
      } 

     /* console.log(Date.now())
     console.log(new Date(boards.boardMkDate).getTime()) */
    const boardDateTime = formatTimeDiff(Date.now() - new Date(boards.boardMkDate).getTime())




   //상세페이지 이동
    const linkToDetail = () => {
      navigate(`/market/mk_boardDetail?no=${boards.boardMkNo}`)
      
    }


    return (
      <>
<div className="card"
  style={{
    width:"16rem",
    display:"inline-block",
    margin: "50px 0px 0px 50px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.3s", // 애니메이션 속도 조절
    transform: hovered ? "scale(1.05)" : "scale(1)",
    border: member_no === boards.memberNo ? "2px solid rgb(80, 50, 200)" : ""
  }}
>
<img src={boards.boardMkFileurl} style={{width:"100%", overflow:'hidden', height: '250px', objectFit: 'cover' , 
borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px'}} 
onClick={linkToDetail}
onMouseEnter={() => { // 마우스를 요소 위로 올리면
  setHovered(true); // 상태값 변경
}}
onMouseLeave={() => { // 마우스를 요소에서 떠나면
  setHovered(false); // 상태값 변경
}}
alt="사진1"/>
<div className="card-body" style={{overflow:"hidden", height:'120px'}}>

<div style={{minHeight:'50px' , marginTop:'5px'}} onClick={linkToDetail}
onMouseEnter={() => { // 마우스를 요소 위로 올리면
  setHovered(true); // 상태값 변경
}}
onMouseLeave={() => { // 마우스를 요소에서 떠나면
  setHovered(false); // 상태값 변경
}}>
<h5 className="card-title" style={{fontFamily:"Nanum Gothic", fontWeight:"bold" ,fontSize:'1rem',opacity:'90%'}}>
  {boards.boardMkTitle}</h5>
</div>
<div style={{ display: "flex", justifyContent: "space-between" , }} onClick={linkToDetail}
onMouseEnter={() => { // 마우스를 요소 위로 올리면
  setHovered(true); // 상태값 변경
}}
onMouseLeave={() => { // 마우스를 요소에서 떠나면
  setHovered(false); // 상태값 변경
}}> 

<p className="card-text" style={{fontFamily:"Nanum Gothic", fontWeight:"bold" , fontSize: "1.5rem" }}>{price}원</p>

<p className="card-text" style={{fontFamily:"Nanum Gothic", fontWeight:"bold" ,  fontSize: "1rem" ,marginTop: "10px" , opacity:'50%'}}>{boardDateTime}</p>
</div>
</div>
   
      <hr style={{marginTop:'-5px'}}/>

      <p className="card-text" style={{color:'black' }} >
   
      <div className="mb-2" style={{display: 'flex', justifyContent: 'center', marginBottom:'10px'}} >
  {member_no === boards.memberNo && <span className="mr-4" style={{color:'black', marginRight:'0px' , fontFamily:"Nanum Gothic", fontWeight:"bold" , fontSize: "1.1rem", color:'rgb(80, 50, 200)'}}>내 게시글</span>}
  {member_no !== boards.memberNo && <span className="mr-4" style={{color:'black', marginRight:'0px'}}><i class="bi bi-heart" />{" "}{boards.boardMkLikes}</span>}
</div>
       </p>
       <hr style={{marginTop:'-25px' , opacity:'0'}}/>
</div>


    </>
    )
  }

  export default MarketRow
