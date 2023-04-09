import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoardListDB,
  selectBoardDetailDB,
} from "../../axios/board/boardLogic";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FormDiv } from "../../styles/formStyle";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();

  const [board, setBoard] = useState({
    boardTgNo: 0,
    boardTgMemId: "",
    boardTgTitle: "",
    boardTgContent: "",
    boardTgDate: "",
  });
  useEffect(() => {
    const asyncDB = async () => {
      const res = await selectBoardDetailDB({ boardTgNo });
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
        // 가져온 게시글 정보를 board state에 저장
        setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    };
  }, []);

  /*   if (!board.boardTitle) {
    console.log(board.boardTitle)
    return <div>데이터를 불러오는 중입니다...</div>;
  } */

  const deleteBoardList = async () => {
    const board = {
      boardTgNo: boardTgNo,
    };
    const res = await deleteBoardListDB(board);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/together");
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
                  class="form-control form-control-lg"
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
                  class="form-control form-control-lg"
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
                  class="form-control form-control-lg"
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
                  name="boardContent"
                  required
                  rows="10"
                  class="form-control"
                  id="exampleTextarea"
                >
                  {board.boardTgContent}
                </span>
              </div>

              <div>
                <label class="form-block">첨부파일</label>
                <input
                  style={{ width: "98%", margin: "10px" }}
                  type="file"
                  name="attach"
                  accept="image/*"
                  multiple="multiple"
                  class="form-control"
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
                <Button
                  style={{ margin: "10px", backgroundColor: "black" }}
                  onClick={deleteBoardList}
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
                      pathname: "/together/BoardUpdate/" + board.boardTgNo,
                      state: { board },
                    })
                  }
                >
                  수정하자
                </Button>
              </div>
            </form>
          </div>
        </FormDiv>
      </div>
    </div>
  );
};

export default BoardDetail;
