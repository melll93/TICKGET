import React from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { mk_boardDeleteDB } from "../../../axios/board/market/marketLogic";
import { BButton, MButton } from "../../../styles/formStyle";

const cookies = new Cookies();

const MarketBoardHeader = ({ detail, no }) => {

  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)



  console.log(detail);
  console.log(no);
  const navigate = useNavigate();

  const boardDelete = async () => {
    const board = {
      boardMkNo: no,
    };
    const res = await mk_boardDeleteDB(board);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/market");
  };

  const boardList = () => {
    navigate("/market");
  };

  return (

<div>
  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <div style={{ overflow: "auto" }}>
      <span
        style={{
          marginLeft: "10px",
          marginBottom: "12px",
          fontSize: "30px",
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
      }}
    >
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{  marginRight: "100px", fontFamily:"Nanum Gothic", fontWeight:"bold" , fontSize: "1.8rem" }}>{detail.mk_ticket_price} 원</div>
      {
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <MButton
            style={{ margin: "0px 10px 0px 10px" }}
            onClick={() => {
              navigate(`/market/update/${no}`);
            }}
          >
            수정
          </MButton>
          <MButton
            style={{ margin: "0px 10px 0px 10px" }}
            onClick={() => {
              boardDelete();
            }}
          >
            삭제
          </MButton>
          <MButton
            style={{ margin: "0px 10px 0px 10px" }}
            onClick={boardList}
          >
            목록
          </MButton>
        </div>
      }
    </div>
  <hr style={{ height: "2px" }} />
  </div>
</div>
  );
};

export default MarketBoardHeader;
