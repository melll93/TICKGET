import React from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { mk_boardDeleteDB } from "../../../axios/board/market/marketLogic";
import { BButton } from "../../../styles/formStyle";

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ overflow: "auto" }}>
            <span
              style={{
                marginLeft: "10px",
                marginBottom: "12px",
                fontSize: "30px",
                display: "block",
                color:'black'
              }}
            >
              {detail.board_mk_title}
            </span>
          </div>
          {
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <BButton
                style={{ margin: "0px 10px 0px 10px" }}
                onClick={() => {
                  navigate(`/market/update/${no}`);
                }}
              >
                수정
              </BButton>


     {/*          { _userData.no == detail.mem_no &&
                   <BButton
                   style={{ margin: "0px 10px 0px 10px" }}
                   onClick={() => {
                     navigate(`/market/update/${no}`);
                   }}
                 >
                   수정
                 </BButton>
              
              }    게시글 작성자의 회원번호와 현재 글을 조회한 사용자의 회원번호가 일치할 때만 수정 및 삭제 가능
 
              { _userData.no == detail.mem_no &&}
    <BButton
                style={{ margin: "0px 10px 0px 10px" }}
                onClick={() => {
                  boardDelete();
                }}
              >
                삭제
              </BButton>
              }
 
 
 */}

              <BButton
                style={{ margin: "0px 10px 0px 10px" }}
                onClick={() => {
                  boardDelete();
                }}
              >
                삭제
              </BButton>
              <BButton
                style={{ margin: "0px 10px 0px 10px" }}
                onClick={boardList}
              >
                목록
              </BButton>
            </div>
          }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{color:'black'}}>▪ {detail.mem_name}</span>
            <span style={{color:'black'}}>
              ▪ {detail.board_mk_date} | 조회수 {detail.board_mk_hit}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
              fontSize: "16px",
            }}
          >
            {/*                <div style={{display: 'flex'}}>
               <span style={{marginLeft:'10px' }}>조회수 :</span>
               <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.board_mk_hit}</div>
               </div> */}
            <div style={{ display: "flex" }}>
              {detail.COMMENT ? (
                <>
                  <span style={{ marginRight: "5px" }}>댓글수 :</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "30px",
                    }}
                  >
                    {detail.COMMENT}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr style={{ height: "2px" }} />
    </div>
  );
};

export default MarketBoardHeader;
