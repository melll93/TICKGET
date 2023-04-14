import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTogetherDB,
  selectTogetherDetailDB,
} from "../../../axios/board/together/TogetherLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { BButton, FormDiv } from "../../../styles/formStyle";
import {
  insertTogetherReplyDB,
  selectTogetherReplyDB,
} from "../../../axios/board/together/TogetherReplyLogic";
import Table from "react-bootstrap/esm/Table";

const TogetherBoardDetail = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();
  const { boardReplyTgMemId } = useState();
  const [boardReplyTgContent, setBoardReplyTgContent] = useState(""); //제목

  const [boardReplyList, setBoardReplyList] = useState([]);

  useEffect(() => {
    selectBoardReplyList();
  }, []);

  const selectBoardReplyList = async () => {
    const boardReply = {
      boardTgNo: boardTgNo,
    };
    const res = await selectTogetherReplyDB(boardReply);
    console.log("asdas d", res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardReplyList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const handleBoardReplyTgContent = useCallback((e) => {
    setBoardReplyTgContent(e);
  }, []);

  const [board, setBoard] = useState({
    boardTgNo: 0,
    boardTgMemId: "",
    boardTgTitle: "",
    boardTgContent: "",
    boardTgDate: "",
  });

  useEffect(() => {
    const asyncDB = async () => {
      const res = await selectTogetherDetailDB({ boardTgNo });
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setBoard({
        boardTgNo: jsonDoc.boardTgNo,
        boardTgMemId: jsonDoc.boardTgMemId,
        boardTgTitle: jsonDoc.boardTgTitle,
        boardTgContent: jsonDoc.boardTgContent,
        boardTgDate: jsonDoc.boardTgDate,
      });
      if (res.data) {
        setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  if (!board.boardTgTitle) {
    console.log(board.boardTgTitle);
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const deleteBoardList = async () => {
    const board = {
      boardTgNo: boardTgNo,
    };
    const res = await deleteTogetherDB(board);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/together");
  };

  const submitComment = async () => {
    console.log("submitComment");
    const boardReply = {
      boardTgNo: boardTgNo,
      boardReplyTgMemId: sessionStorage.getItem("id"),
      boardReplyTgContent: boardReplyTgContent,
    };

    if (!boardReplyTgContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await insertTogetherReplyDB(boardReply);
      // 성공시에 페이지 이동처리하기
      window.location.replace(
        "http://localhost:3333/together/BoardDetail/" + boardTgNo
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="center">
        <Header />
        <br />
        <h2>게시글 훔쳐봐야지? 가야지?</h2>
        <FormDiv style={{ width: "98%", margin: "10px" }}>
          <div>
            <form method="post">
              <input type="hidden" name="boardTgNo" value="" />
              <div>
                <label>제목</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="boardTgTitle"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {board.boardTgTitle}
                </span>
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="boardTgMemId"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {board.boardTgMemId}
                </span>
              </div>

              <div>
                <label>날짜</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="boardTgMemDate"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {board.boardTgDate}
                </span>
              </div>

              <div>
                <label>내용</label>
                <span
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                  }}
                  type="html"
                  name="boardContent"
                  required
                  rows="10"
                  className="form-control"
                  id="exampleTextarea"
                >
                  {board.boardTgContent}
                </span>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{ margin: "10px", backgroundColor: "black" }}
                  onClick={() => navigate("/together")}
                >
                  목록으로
                </Button>
                &nbsp;
                <Button
                  style={{ margin: "10px", backgroundColor: "black" }}
                  onClick={deleteBoardList}
                >
                  삭제하자
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() =>
                    navigate({
                      pathname: "/together/BoardUpdate/" + board.boardTgNo,
                      state: { board },
                    })
                  }
                >
                  수정하자
                </Button>
              </div>

              <label>댓글</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <textarea
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "100px",
                    fontSize: "16px",
                  }}
                  name="boardReplyTgContent"
                  onChange={(e) => {
                    handleBoardReplyTgContent(e.target.value);
                  }}
                  required
                  rows="3"
                  className="form-control"
                />
                <button
                  style={{ margin: "30px", width: "80px" }}
                  onClick={submitComment}
                >
                  등록
                </button>
              </div>

              <div
                style={{
                  width: "1500px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="row" style={{ marginTop: "40px" }}>
                  <Table className="table table-hover">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>번호</th>
                        <th width="40%">제목</th>
                        <th style={{ textAlign: "center" }}>작성자</th>
                        <th style={{ textAlign: "center" }}>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardReplyList.map((boardReply) => (
                        <tr key={boardReply.boardReplyTgNo}>
                          <td style={{ textAlign: "center" }}>
                            {boardReply.boardReplyTgNo}
                          </td>
                          <td>
                            <button
                              style={{
                                border: "none",
                                background: "none",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            >
                              {boardReply.boardReplyTgContent}
                            </button>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {boardReply.boardReplyTgMemId}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {boardReply.boardReplyTgDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              {boardReplyList.map((boardReply) => (
                <div
                  key={boardReply.boardReplyTgNo}
                  className="product_detail_review_comment"
                  style={{
                    borderBottom: "1px solid lightgray",
                    width: "1100px",
                    margin: "50px",
                  }}
                >
                  회원아이디 : {boardReply.boardReplyTgMemId} 아이디없음{" "}
                  <span style={{ fontSize: "12px" }}>
                    ({boardReply.boardReplyTgDate})
                  </span>
                  <h3>
                    &nbsp; <span style={{ color: "red" }}>凸</span>
                    {boardReply.boardReplyTgContent}
                    <span style={{ color: "red" }}>凸</span>
                  </h3>
                  <Button
                    style={{ marginLeft: "10px", backgroundColor: "YELLOW" }}
                    onClick={() =>
                      navigate({
                        pathname: "/together/BoardUpdate/" + board.boardTgNo,
                        state: { board },
                      })
                    }
                  >
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      수정
                    </span>
                  </Button>
                  <Button
                    style={{ marginLeft: "10px", backgroundColor: "BLUE" }}
                    onClick={() =>
                      navigate({
                        pathname: "/together/BoardUpdate/" + board.boardTgNo,
                        state: { board },
                      })
                    }
                  >
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      삭제
                    </span>
                  </Button>
                </div>
              ))}
            </form>
          </div>
        </FormDiv>
      </div>
    </div>
  );
};

export default TogetherBoardDetail;
