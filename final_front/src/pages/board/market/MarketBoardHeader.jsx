import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { mk_boardDeleteDB, mk_boardDetailDB } from "../../../axios/board/market/marketLogic";
import { BButton, MButton } from "../../../styles/formStyle";
import Swal from "sweetalert2";


const cookies = new Cookies();

const MarketBoardHeader = ({ detail, no }) => {
  
  //회원 정보
  const _userData = cookies.get("_userData"); 
  /* console.log(_userData) */

  let member_no;
  if (_userData) {
    member_no = _userData.memberNo;
  }



  const [boardmemno , setBoardMemNo] = useState()
  const navigate = useNavigate();

  
  useEffect(()=> {
    const boardDetail = async () => {
      const board = {
        boardMkNo: no
      }
      const res = await mk_boardDetailDB(board);
      console.log(res.data);
      const temp = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(temp)
      console.log(jsonDoc[0].memberNo); //회원번호 판별
      setBoardMemNo(jsonDoc[0].memberNo)
    }
    boardDetail()
  },[])


  //삭제 기능
  const boardDelete = async () => {
    const board = {
      boardMkNo: no,
    };
    const res = await mk_boardDeleteDB(board);
    console.log(res.data);
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      icon: 'warning',
     showCancelButton: true,
   }).then((result) => {
     if (result.isConfirmed) {
       Swal.fire('삭제가 완료되었습니다!','','success')
       navigate("/market");
     }
   });
  };

  //게시판 목록 이동
  const boardList = () => {
    navigate("/market");
  };

  return (
<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
  <div style={{ overflow: "auto" }}>
    <span
      style={{
        marginBottom: "12px",
        fontSize: "1.5rem",
        display: "block",
        color: "black",
      }}
    >
      {detail.board_mk_title}
    </span>
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "16px",
      alignItems: "center",
    }}
  >
    <div style={{ fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "2.0rem" }}>
      {detail.mk_ticket_price} 원
    </div>
    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: '10px' }}>
      {member_no === boardmemno && (
        <>
          <MButton style={{ margin: "0px 10px 0px 10px" }} onClick={() => { navigate(`/market/update/${no}`); }}>
            수정
          </MButton>
          <MButton style={{ margin: "0px 10px 0px 10px" }} onClick={boardDelete}>
            삭제
          </MButton>
        </>
      )}
      <MButton style={{ margin: "0px 10px 0px 10px" }} onClick={boardList}>
        목록
      </MButton>
    </div>
  </div>
</div>
  );
};

export default MarketBoardHeader;
