  import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

  const MarketRow = ({boards}) => {
    console.log(boards); // 마켓 게시판 조회 데이터
    const navigate = useNavigate()

    const linkToDetail = () => {
      navigate(`/market/mk_boardDetail?no=${boards.boardMkNo}`)
      
    }


    return (
      <>
      
   {/*    <tr id="fontTest">
        <td style={{textAlign:"center"}} onClick={linkToDetail}>{boards.boardMkTitle}</td>
        <td style={{textAlign:"center"}}>{boards.mkTicketCount}</td> 
        <td style={{textAlign:"center"}}>{boards.mkTicketPrice.toLocaleString()} 원</td> 
        <td style={{textAlign:"center"}}>{boards.boardMkDate}</td>   
        <td style={{textAlign:"center"}}>{boards.memName}</td> 
        <td style={{textAlign:"center"}}>{boards.boardMkHit}</td>  
      </tr>   */}
      <div className="card"
       style={{
        width:"18rem",
        display:"inline-block",
        margin: "50px 0px 0px 50px",
}}>
<img src={boards.boardMkFileurl} style={{width:"100%", overflow:'hidden', height:'400px'}} alt="사진1" />
<div className="card-body" style={{overflow:"hidden", height:'220px'}} >
<h5 className="card-title">{boards.boardMkTitle}</h5>
<p className="card-text">{boards.mkTicketPlace}</p>
</div>
</div>

    </>
    )
  }

  export default MarketRow
