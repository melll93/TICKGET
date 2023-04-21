import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { mk_boardDeleteDB,  mk_boardHeaderDetailDB } from "../../../axios/board/market/marketLogic";
import { BButton, MButton } from "../../../styles/formStyle";
import Swal from "sweetalert2";


const cookies = new Cookies();

const MarketBoardHeader = ({ detail, no }) => {
  //상세보기 정보를 detail props로 받는다
  console.log(detail)

  
  //회원 정보
  const _userData = cookies.get("_userData"); 
  /* console.log(_userData) */

  let member_no;
  if (_userData) {
    member_no = _userData.memberNo;
  }

  const mkbNo = detail.board_mk_no; /* 삭제,수정시 필요한 글번호 */
  console.log(mkbNo)

  const navigate = useNavigate();



  //삭제 기능
  const boardDelete = async () => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => { // async 키워드를 추가해줍니다.
      if (result.isConfirmed) {
        const board = {
          boardMkNo: mkbNo,
        };
        const res = await mk_boardDeleteDB(board);
        console.log(res.data);
        Swal.fire('삭제가 완료되었습니다!','','success');
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
        fontWeight: "bold",
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
      {member_no === detail.member_no && (
        <>
          <MButton style={{ margin: "0px 10px 0px 10px" }} onClick={() => { navigate(`/market/update/${mkbNo}`); }}>
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
