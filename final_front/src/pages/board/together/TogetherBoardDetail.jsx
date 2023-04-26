import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteTogetherDB,
  selectTogetherDetailDB,
} from "../../../axios/board/together/TogetherLogic";
import {
  deleteTogetherReplyDB,
  insertTogetherReplyDB,
  selectTogetherReplyDB,
  updateTogetherReplyDB,
} from "../../../axios/board/together/TogetherReplyLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv } from "../../../styles/formStyle";

const TogetherBoardDetail = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();
  const [boardReplyTgNo, setBoardReplyTgNo] = useState("");
  const [boardReplyTgMemId, setBoardReplyTgMemId] = useState("");
  const [boardReplyTgContent, setBoardReplyTgContent] = useState("");
  const [boardReplyTgContent2, setBoardReplyTgContent2] = useState("");
  const [boardReplyList, setBoardReplyList] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log("_userData : ", _userData);

  const inputModifiedReply = useCallback((e) => {
    console.log("inputModifiedReply : ", e);
    setBoardReplyTgContent2(e);
  }, []);

  useEffect(() => {
    selectBoardReplyList();
  }, []);

  const selectBoardReplyList = async () => {
    const boardReply = {
      boardTgNo: boardTgNo,
    };
    const res = await selectTogetherReplyDB(boardReply);
    if (res.data && Array.isArray(res.data)) {
      setBoardReplyList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const handleBoardReplyTgNo = useCallback((e) => {
    setBoardReplyTgNo(e);
  }, []);

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

  const asyncDB = async () => {
    const res = await selectTogetherDetailDB({ boardTgNo });
    console.log("res", res);
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
  useEffect(() => {
    asyncDB();
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
    Swal.fire({
      title: "게시글 삭제 완료",
      icon: "success",
    });
    navigate("/together");
  };

  const submitComment = async () => {
    console.log("submitComment");
    const boardReply = {
      boardTgNo: boardTgNo,
      boardReplyTgMemId: _userData.memberId,
      boardReplyTgContent: boardReplyTgContent,
    };

    if (!boardReplyTgContent) {
      Swal.fire({
        title: "내용을 입력해주세요.",
        icon: "warning",
      });
    }
    try {
      const res = await insertTogetherReplyDB(boardReply);
      // 성공시에 페이지 이동처리하기
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const click = () => {
    setLgShow(true);
  };

  const handleContent = (value) => {
    setBoard((prevState) => ({
      ...prevState,
      boardTgContent: value,
    }));
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "150px" }}></div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            border: "2px solid lightGray",
            borderRadius: "20px",
            padding: "10px",
            maxWidth: "1500px",
            minHeight: "650px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "98%", margin: "10px" }}>
            <h2>게시글 상세보기</h2>
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
                    name="boardTgDate"
                    required
                    className="form-control form-control-lg"
                    id="inputLarge"
                  >
                    {board.boardTgDate}
                  </span>
                </div>

                <div>
                  <label>내용</label>
                  <textarea
                    style={{
                      width: "98%",
                      margin: "10px",
                      height: "300px",
                      fontSize: "20px",
                    }}
                    value={board.boardTgContent}
                    type="html"
                    name="boardContent"
                    required
                    rows="10"
                    className="form-control"
                    readOnly
                    id="exampleTextarea"
                    onChange={(e) => {
                      handleContent(e.target.value);
                    }}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Button
                    style={{ margin: "10px", backgroundColor: "black" }}
                    onClick={() => navigate("/together")}
                  >
                    목록으로
                  </Button>
                  &nbsp;
                  {board.boardTgMemId === _userData?.memberId && (
                    <div>
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
                            pathname:
                              "/together/BoardUpdate/" + board.boardTgNo,
                            state: { board },
                          })
                        }
                      >
                        수정하자
                      </Button>
                    </div>
                  )}
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
                    maxLength="1000"
                  />
                </div>
                <div>
                  <Button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "black",
                      textAlign: "center",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      submitComment();
                    }}
                  >
                    댓글 등록
                  </Button>
                </div>

                <div
                  style={{
                    width: "1500px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <br />

                <label>댓글리스트</label>
                <div
                  style={{
                    border: "2px solid lightGray",
                    width: "98%",
                    margin: "10px",
                  }}
                >
                  {boardReplyList.map((boardReply) => (
                    <div
                      key={boardReply.boardReplyTgNo}
                      className="product_detail_review_comment"
                      style={{
                        borderBottom: "1px solid lightgray",
                        width: "90%",
                        margin: "50px",
                      }}
                    >
                      회원아이디 : {boardReply.boardReplyTgMemId}
                      <div style={{ fontSize: "12px" }}>
                        작성 시간 : ({boardReply.boardReplyTgDate})
                      </div>
                      <h3>
                        &nbsp;
                        <div className="replyContent">
                          <span style={{ color: "red" }}> → </span>
                          <span
                            className="replyContentVal"
                            style={{ color: "black" }}
                          >
                            {boardReply.boardReplyTgContent}
                          </span>
                        </div>
                      </h3>
                      {boardReply.boardReplyTgMemId === _userData?.memberId && (
                        <Button
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "black",
                          }}
                        >
                          <span
                            style={{ fontWeight: "bold" }}
                            onClick={async () => {
                              click();
                              handleBoardReplyTgNo(boardReply.boardReplyTgNo);
                            }}
                          >
                            댓글 수정
                          </span>
                        </Button>
                      )}
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            댓글 수정 detail
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div
                            className="form-floating mb-3"
                            style={{ position: "relative" }}
                          >
                            <div>
                              <input
                                onChange={(e) => {
                                  inputModifiedReply(e.target.value);
                                }}
                                className="form-control2"
                                placeholder="수정할 댓글 내용을 입력하세요"
                                id="together_board_detail_reply_textarea"
                                // value={boardReplyTgContent}
                                style={{
                                  position: "relative",
                                  height: "300px",
                                  width: "98%",
                                  maxWidth: "1200px",
                                }}
                                maxLength="100"
                              ></input>
                            </div>
                            <br />
                            <br />
                            <button
                              style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                margin: "0px 15px 0px 0px ",
                              }}
                              className="replyBtn"
                              onClick={async () => {
                                const reply = {
                                  boardTgNo: boardTgNo,
                                  boardReplyTgNo: boardReplyTgNo,
                                  boardReplyTgContent: boardReplyTgContent2,
                                };
                                const res = await updateTogetherReplyDB(reply);
                                console.log(
                                  "updateTogetherReplyDB : ",
                                  res.data
                                );
                                setLgShow(false);
                                Swal.fire({
                                  title: "댓글 수정 완료",
                                  icon: "success",
                                });
                                window.location.reload();
                                console.log(
                                  "리뷰번호" + boardReply.boardReplyTgNo
                                );
                              }}
                            >
                              Reply Button
                            </button>
                          </div>
                          <br />
                        </Modal.Body>
                      </Modal>
                      {boardReply.boardReplyTgMemId === _userData?.memberId && (
                        <Button
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "black",
                          }}
                          onClick={async () => {
                            const reply = {
                              boardTgNo: boardTgNo,
                              boardReplyTgNo: boardReply.boardReplyTgNo,
                            };
                            const res = await deleteTogetherReplyDB(reply);
                            console.log("deleteTogetherReplyDB ", res.data);
                            // navigate("/together/BoardDetail/" + board.boardTgNo);
                            window.location.reload();
                            /* alert("댓글 삭제 완료"); */
                            Swal.fire({
                              title: "댓글 삭제 완료",
                              icon: "success",
                            });
                          }}
                        >
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            댓글 삭제
                          </span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default TogetherBoardDetail;
