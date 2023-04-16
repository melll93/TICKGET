import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  CarpoolDetailDB,
  deleteCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import {
  selectCarpoolReplyDB,
  insertCarpoolReplyDB,
} from "../../../axios/board/carpool/CarpoolReplyLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";
import LandingPage from "./Map/LandingPage";

const CarpoolDetail = () => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const { boardReplyCpMemId } = useState();
  const [boardReplyCpContent, setBoardReplyCpContent] = useState(""); //제목
  const [boardReplyList, setBoardReplyList] = useState([]);

  useEffect(() => {
    selectBoardReplyList();
  }, []);

  const selectBoardReplyList = async () => {
    const boardReply = {
      boardCpNo: boardCpNo,
    };
    const res = await selectCarpoolReplyDB(boardReply);
    console.log("asdas d", res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardReplyList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const handleBoardReplyCpContent = useCallback((e) => {
    setBoardReplyCpContent(e);
  }, []);

  const [carpool, setCarpool] = useState({
    boardCpNo: 0,
    boardCpMemId: "",
    boardCpTitle: "",
    boardCpContent: "",
    boardCpDate: "",
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
      });
      if (res.data) {
        setCarpool(res.data);
      } else {
        console.log("카풀 게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    };
  }, []);

  const deleteCarpool = async () => {
    const carpool = {
      boardCpNo: boardCpNo,
    };
    const res = await deleteCarpoolDB(carpool);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/carpool");
  };

  const submitComment = async () => {
    console.log("submitComment");
    const boardReply = {
      boardCpNo: boardCpNo,
      boardReplyCpMemId: sessionStorage.getItem("id"),
      boardReplyCpContent: boardReplyCpContent,
    };

    if (!boardReplyCpContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await insertCarpoolReplyDB(boardReply);
      // 성공시에 페이지 이동처리하기
      window.location.replace(
        "http://localhost:3333/carpool/carpoolDetail/" + boardCpNo
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <br />
        <FormDiv style={{ width: "98%", margin: "10px" }}>
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
                <span
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                  }}
                  type="html"
                  name="carpoolContent"
                  required
                  rows="10"
                  className="form-control"
                  id="exampleTextarea"
                >
                  {carpool.boardCpContent}
                </span>
              </div>

              <div
                style={{
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                  width: "98%",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LandingPage />
              </div>
            </form>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={() => navigate("/carpool")}
            >
              목록으로
            </Button>
            &nbsp;
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={deleteCarpool}
            >
              삭제하자
            </Button>
            {/* <Button style={{ margin: "10px" }} onClick={() =>navigate({
                    pathname: "/together/BoardDetail/"+board.boardTgNo,
                    state:{board}})}> */}
            <Button
              style={{ marginLeft: "10px", backgroundColor: "black" }}
              onClick={() =>
                navigate({
                  pathname: "/carpool/CarpoolUpdate/" + carpool.boardCpNo,
                  state: { carpool },
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
              name="boardReplyCpContent"
              onChange={(e) => {
                handleBoardReplyCpContent(e.target.value);
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
          />
          <br />
          <label>댓글리스트</label>
          {boardReplyList.map((boardReply) => (
            <div
              key={boardReply.boardReplyCpNo}
              className="product_detail_review_comment"
              style={{
                borderBottom: "1px solid lightgray",
                width: "1100px",
                margin: "50px",
              }}
            >
              회원아이디 : {boardReply.boardReplyCpMemId} 아이디없음{" "}
              <div style={{ fontSize: "12px" }}>
                ({boardReply.boardReplyCpDate})
              </div>
              <h3>
                &nbsp; <span style={{ color: "red" }}>→</span>
                {boardReply.boardReplyCpContent}
              </h3>
              <Button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() =>
                  navigate({
                    pathname: "/carpool/carpoolUpdate/" + carpool.boardCpNo,
                    state: { carpool },
                  })
                }
              >
                <span style={{ fontWeight: "bold" }}>수정</span>
              </Button>
              <Button
                style={{ marginLeft: "10px", backgroundColor: "black" }}
                onClick={() =>
                  navigate({
                    pathname: "/carpool/carpoolUpdate/" + carpool.boardCpNo,
                    state: { carpool },
                  })
                }
              >
                <span
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                  }}
                >
                  삭제
                </span>
              </Button>
            </div>
          ))}
        </FormDiv>
      </ContainerDiv>
    </div>
  );
};

export default CarpoolDetail;
