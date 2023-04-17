  import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

  const MarketRow = ({boards}) => {
    console.log(boards); // 마켓 게시판 조회 데이터
    const navigate = useNavigate()

    //가격 쉼표 처리
    const price = boards.mkTicketPrice.toLocaleString()
    console.log(price)


    //현재 시간 - 게시글 작성 시간
    const now = new Date();
    const boardMkDateTime = new Date(boards.boardMkDate)
    const diffInMs = now - boardMkDateTime;
    console.log(diffInMs)
       
   

    //작성일 태그에 적용
      const formatTimeDiff = (diffInMs) =>{
        const seconds = Math.floor(diffInMs / 1000)
        if (seconds < 60) {
          console.log(`${seconds}초 전`);
          return `${seconds}초 전`;
        } else {
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) {
            console.log(`${minutes}분 전`);
            return `${minutes}분 전`;
          } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
              console.log(`${hours}시간 전`);
              return `${hours}시간 전`;
            } else {
              const days = Math.floor(hours / 24);
              if (days < 30) {
                console.log(`${days}일 전`);
                return `${days}일 전`;
              } else {
                const months = Math.floor(days / 30);
                if (months < 12) {
                  console.log(`${months}개월 전`);
                  return `${months}개월 전`;
                } else {
                  const years = Math.floor(months / 12);
                  console.log(`${years}년 전`);
                  return `${years}년 전`;
                }
              }
            }
          }
        }
      } 

     console.log(Date.now())
     console.log(new Date(boards.boardMkDate).getTime())
    const boardDateTime = formatTimeDiff(Date.now() - new Date(boards.boardMkDate).getTime())




   //상세페이지 이동
    const linkToDetail = () => {
      navigate(`/market/mk_boardDetail?no=${boards.boardMkNo}`)
      
    }


    return (
      <>
      <div className="card"
       style={{
        width:"15rem",
        display:"inline-block",
        margin: "50px 0px 0px 50px",
        borderRadius: "10px",
}}>
<img src={boards.boardMkFileurl} style={{width:"100%", overflow:'hidden', height: '250px', objectFit: 'cover' , 
borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px'}} alt="사진1" onClick={linkToDetail}/>
<div className="card-body" style={{overflow:"hidden", height:'120px'}} onClick={linkToDetail}>
<h5 className="card-title"  onClick={linkToDetail}>{boards.boardMkTitle}</h5>
<div style={{ display: "flex", justifyContent: "space-between" , }}> 
<p className="card-text" style={{fontFamily:"Nanum Gothic", fontWeight:"bold" , fontSize: "1.5rem" }}>{price}원</p>
<p className="card-text" style={{fontFamily:"Nanum Gothic", fontWeight:"bold" ,  fontSize: "0.85rem" ,marginTop: "10px" , opacity:'60%'}}>{boardDateTime}</p>
</div>
</div>
   
      <hr style={{marginTop:'-22px'}}/>
      <p className="card-text" style={{marginLeft:'5px' , fontSize:'0.8rem'}} ><i class="bi bi-geo-alt-fill"></i> {boards.mkTicketPlace}</p>
       <hr style={{marginTop:'-18px' , opacity:'0'}}/>
</div>


    </>
    )
  }

  export default MarketRow
