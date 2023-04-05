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
      <tr>
        <td style={{textAlign:"center"}} >{boards.boardMkNo}</td> {/* 게시글 번호 */} 
        <td style={{textAlign:"center"}} onClick={linkToDetail}>{boards.boardMkTitle}</td> {/* 게시글 제목 */} 
        <td style={{textAlign:"center"}}>{boards.mkTicketCount}</td> {/* 판매 티켓 수량*/} 
        <td style={{textAlign:"center"}}>{boards.mkTicketPrice}</td> {/* 판매등록가 */} 
        <td style={{textAlign:"center"}}>{boards.boardMkDate}</td>  {/* 게시글 등록일 */} 
        <td style={{textAlign:"center"}}>{boards.memName}</td> {/* 게시글 작성자 */}
        <td style={{textAlign:"center"}}>{boards.boardMkHit}</td>  {/* 게시글 조회수 */} 
      </tr>
    </>
    )
  }

  export default MarketRow
