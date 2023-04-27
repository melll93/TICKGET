import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/compat/database";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CarpoolDetailDB,
  deleteCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import {
  deleteCarpoolReplyDB,
  insertCarpoolReplyDB,
  selectCarpoolReplyDB,
  updateCarpoolReplyDB,
} from "../../../axios/board/carpool/CarpoolReplyLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv } from "../../../styles/formStyle";
import MapContainer from "../market/Map/MapContainer";

const CarpoolDetail = ({ match }) => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const [boardReplyCpNo, setBoardReplyCpNo] = useState("");
  const [boardReplyCpContent, setBoardReplyCpContent] = useState(""); //기존 댓글
  const [boardReplyCpContent2, setBoardReplyCpContent2] = useState(""); //수정 댓글
  const [boardReplyList, setBoardReplyList] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const [place, setPlace] = useState("");

  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData);

  const inputModifiedReply = useCallback((e) => {
    console.log("inputModifiedReply : ", e);
    setBoardReplyCpContent2(e);
  }, []);

  useEffect(() => {
    selectBoardReplyList();
  }, []);

  const selectBoardReplyList = async () => {
    const boardReply = { boardCpNo: boardCpNo };
    const res = await selectCarpoolReplyDB(boardReply);
    if (res.data && Array.isArray(res.data)) {
      setBoardReplyList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const handleBoardReplyCpNo = useCallback((e) => {
    setBoardReplyCpNo(e);
  }, []);

  const handleBoardReplyCpContent = useCallback((e) => {
    setBoardReplyCpContent(e);
  }, []);

  const [carpool, setCarpool] = useState({
    boardCpNo: 0,
    boardCpMemId: "",
    boardCpTitle: "",
    boardCpContent: "",
    boardCpDate: "",
    boardCpPlace: "",
  });

  useEffect(() => {
    const asyncDB = async () => {
      const res = await CarpoolDetailDB({ boardCpNo });
      console.log(res);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setCarpool({
        boardCpNo: jsonDoc.boardCpNo,
        boardCpMemId: jsonDoc.boardCpMemId,
        boardCpTitle: jsonDoc.boardCpTitle,
        boardCpContent: jsonDoc.boardCpContent,
        boardCpDate: jsonDoc.boardCpDate,
        boardCpPlace: jsonDoc.boardCpPlace,
      });
      if (res.data) {
        setCarpool(res.data);
        setPlace(jsonDoc.boardCpPlace);
      } else {
        console.log("카풀 게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  if (!carpool.boardCpTitle) {
    console.log(carpool.boardCpTitle);
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const deleteCarpool = async () => {
    const carpool = {
      boardCpNo: boardCpNo,
    };
    const res = await deleteCarpoolDB(carpool);
    console.log(res.data);
    Swal.fire({
      title: "게시글 삭제 완료",
      icon: "success",
    });
    navigate("/carpool");
  };

  const submitComment = async () => {
    console.log("submitComment");
    const boardReply = {
      boardCpNo: boardCpNo,
      boardReplyCpMemId: _userData.memberId,
      boardReplyCpContent: boardReplyCpContent,
    };

    if (!boardReplyCpContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await insertCarpoolReplyDB(boardReply);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      title: "댓글 등록 되었습니다.",
      icon: "success",
    });
  };

  const click = () => {
    setLgShow(true);
  };

  const handleContent = (value) => {
    setCarpool((prevState) => ({
      ...prevState,
      boardCpContent: value,
    }));
  };

  return (
    <>
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
              <h2>카풀 상세보기</h2>
              <br />
              <div>
                <form method="post">
                  <input type="hidden" name="boardCpNo" value="" />
                  <div>
                    <label>제목</label>
                    <span
                      style={{ width: "98%", margin: "10px" }}
                      type="text"
                      name="carpoolTitle"
                      required
                      className="form-control form-control-lg"
                      id="inputLarge"
                    >
                      {carpool.boardCpTitle}
                    </span>
                  </div>

                  <div>
                    <label>작성자</label>
                    <span
                      style={{ width: "98%", margin: "10px" }}
                      type="text"
                      name="carpoolMemId"
                      required
                      className="form-control form-control-lg"
                      id="inputLarge"
                    >
                      {carpool.boardCpMemId}
                    </span>
                  </div>

                  <div>
                    <label>날짜</label>
                    <span
                      style={{ width: "98%", margin: "10px" }}
                      type="text"
                      name="carpoolCpDate"
                      required
                      className="form-control form-control-lg"
                      id="inputLarge"
                    >
                      {carpool.boardCpDate}
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
                      value={carpool.boardCpContent}
                      name="carpoolContent"
                      required
                      rows="10"
                      className="form-control"
                      id="exampleTextarea"
                      readOnly
                      onChange={(e) => {
                        handleContent(e.target.value);
                      }}
                    />
                  </div>

                  <label>만남의 장소</label>
                  <div
                    style={{
                      border: "1px solid lightGray",
                      borderRadius: "10px",
                      width: "98%",
                      margin: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "left",
                        marginTop: "25px",
                        opacity: "90%",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "7rem",
                          color: "black",
                        }}
                      >
                        ∙ 만남의 장소:
                      </span>
                      {place}
                    </p>
                    <MapContainer place={place} />
                  </div>
                </form>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                        window.history.back();
                  }}
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                >
                  뒤로가기
                </Button>
                &nbsp;
                {carpool.boardCpMemId === _userData?.memberId && (
                  <div>
                    <Button
                      style={{ margin: "10px", backgroundColor: "black" }}
                      onClick={() => {
                        Swal.fire({
                          title: "정말 삭제 하시겠습니까?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "black",
                          cancelButtonColor: "black",
                          confirmButtonText: "네",
                          cancelButtonText: "아니오",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteCarpool();
                          }
                        });
                      }}
                      variant="success"
                    >
                      삭제하자
                    </Button>
                    <Button
                      style={{ marginLeft: "10px", backgroundColor: "black" }}
                      onClick={() =>
                        navigate({
                          pathname:
                            "/carpool/carpoolUpdate/" + carpool.boardCpNo,
                          state: { carpool },
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
                  name="boardReplyCpContent"
                  onChange={(e) => {
                    handleBoardReplyCpContent(e.target.value);
                  }}
                  required
                  rows="3"
                  className="form-control"
                />
              </div>

              <Button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "black",
                  textAlign: "center",
                }}
                onClick={submitComment}
              >
                댓글 등록
              </Button>

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
                    key={boardReply.boardReplyCpNo}
                    className="product_detail_review_comment"
                    style={{
                      borderBottom: "1px solid lightgray",
                      width: "90%",
                      margin: "50px",
                    }}
                  >
                    회원아이디 : {boardReply.boardReplyCpMemId}
                    <div style={{ fontSize: "8px" }}>
                      작성 시간 : ({boardReply.boardReplyCpDate})
                    </div>
                    <h3>
                      <div className="replyContent">
                        <span style={{ color: "red" }}> → </span>
                        <span
                          className="replyContentVal"
                          style={{ color: "black" }}
                        >
                          {boardReply.boardReplyCpContent}
                        </span>
                      </div>
                    </h3>
                    {boardReply.boardReplyCpMemId === _userData?.memberId && (
                      <Button
                        style={{ marginLeft: "10px", backgroundColor: "black" }}
                      >
                        <span
                          onClick={async () => {
                            click();
                            handleBoardReplyCpNo(boardReply.boardReplyCpNo);
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
                              style={{
                                position: "relative",
                                height: "300px",
                                width: "98%",
                                maxWidth: "1200px",
                              }}
                              maxLength=""
                            ></input>
                          </div>
                          <br />
                          <br />
                          <Button
                            style={{
                              backgroundColor: "black",
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              margin: "0px 15px 0px 0px ",
                            }}
                            className="replyBtn"
                            onClick={async () => {
                              const reply = {
                                boardCpNo: boardCpNo,
                                boardReplyCpNo: boardReplyCpNo,
                                boardReplyCpContent: boardReplyCpContent2,
                              };
                              const res = await updateCarpoolReplyDB(reply);
                              console.log("updateTogetherReplyDB : ", res.data);
                              setLgShow(false);
                              Swal.fire({
                                title: "댓글 수정 완료",
                                icon: "success",
                              });
                              window.location.reload();
                              console.log(
                                "리뷰번호" + boardReply.boardReplyCpNo
                              );
                            }}
                          >
                            Reply Button
                          </Button>
                        </div>
                        <br />
                      </Modal.Body>
                    </Modal>
                    {boardReply.boardReplyCpMemId === _userData?.memberId && (
                      <Button
                        style={{ marginLeft: "10px", backgroundColor: "black" }}
                        onClick={async () => {
                          const reply = {
                            boardCpNo: boardCpNo,
                            boardReplyCpNo: boardReply.boardReplyCpNo,
                          };
                          const res = await deleteCarpoolReplyDB(reply);
                          window.location.reload();
                          Swal.fire({
                            title: "댓글 삭제 완료",
                            icon: "success",
                          });
                        }}
                      >
                        <span>댓글 삭제</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerDiv>
      </div>
    </>
  );
};

export default CarpoolDetail;
