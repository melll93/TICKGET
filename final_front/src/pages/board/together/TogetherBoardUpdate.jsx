import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  selectTogetherDetailDB,
  updateTogetherDB,
} from "../../../axios/board/together/TogetherLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";

const TogetherBoardUpdate = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();
  const [boardTgTitle, setTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgDate, setDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgContent, setContent] = useState(""); //사용자가 입력한 내용 담기

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const minute = currentDate.getMinutes().toString().padStart(2, "0");
  const second = currentDate.getSeconds().toString().padStart(2, "0");

  const min = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

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
      console.log("asda = ", jsonDoc);
      setBoard({
        boardTgNo: jsonDoc.boardTgNo,
        boardTgMemId: jsonDoc.boardTgMemId,
        boardTgTitle: jsonDoc.boardTgTitle,
        boardTgContent: jsonDoc.boardTgContent,
        boardTgDate: jsonDoc.boardTgDate,
      });
      if (res.data) {
        console.log(jsonDoc);
        // setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  const updateBoard = async () => {
    if (!boardTgTitle) {
      Swal.fire({
        title: "제목을 수정해주세요.",
        icon: "warning",
      });
      return;
    }

    if (!boardTgContent) {
      Swal.fire({
        title: "내용을 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    const board = {
      boardTgNo: boardTgNo, // 게시글 번호
      boardTgTitle: boardTgTitle, // 제목 추가
      boardTgContent: boardTgContent, // 내용 추가
      boardTgDate: min,
    };

    console.log("board = ", JSON.stringify(board));
    try {
      const res = await updateTogetherDB(board);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      title: "게시글 수정 완료",
      icon: "success",
    });

    navigate("/together");
  };

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);

  const handleContent = useCallback((e) => {
    setContent(e);
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <FormDiv style={{ width: "98%", margin: "10px" }}>
          <h2>게시글 수정하기</h2>
          <br/>
          <div>
            <form method="post">
              <div>
                <h4>수정 할 제목</h4>
                <input
                  id="board_tg_title"
                  type="text"
                  maxLength="100"
                  defaultValue={board.boardTgTitle}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  // placeholder="수정할 제목을 입력해 주세요"
                  onChange={(e) => {
                    handleTitle(e.target.value);
                  }}
                />
              </div>

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />
              <br/>
              <div>
                <h4>작성자</h4>
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

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />
              <br/>
              <div>
                <h4>수정된 날짜</h4>
                <input
                  id="board_date"
                  // type="datetime-local"
                  // defaultValue={board.boardTgDate}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  readOnly
                  step="1"
                  value={min}
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                />
              </div>

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />
              <br/>
              <div>
                <h4>수정할 내용</h4>
                <textarea
                  id="board_tg_date"
                  type="text"
                  maxLength="1000"
                  defaultValue={board.boardTgContent}
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 내용을 입력해 주세요"
                  onChange={(e) => {
                    handleContent(e.target.value);
                  }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    updateBoard();
                  }}
                >
                  수정하기
                </Button>
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "정말로 뒤로 가시겠습니까?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "black",
                      cancelButtonColor: "black",
                      confirmButtonText: "네",
                      cancelButtonText: "아니오",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.history.back();
                      }
                    });
                  }}
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                >
                  뒤로가기
                </Button>
              </div>
            </form>
          </div>
        </FormDiv>
      </ContainerDiv>
    </div>
  );
};

export default TogetherBoardUpdate;
