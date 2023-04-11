import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { selectTogetherDB } from "../../axios/together/TogetherLogic";

const TogetherBoardList = () => {
  console.log("BoardList");
  const navigate = useNavigate();
  // 게시글 목록을 담을 배열
  const [boardList, setBoardList] = useState([]);
  // 컴포넌트가 처음 로딩될 때, 백엔드 API를 호출하여 게시글 목록을 가져옴
  useEffect(() => {
    selectBoardList();
  }, []);

  // 전체 게시글 조회
  const selectBoardList = async () => {
    // axios를 사용하여 게시글 목록을 가져옴
    const res = await selectTogetherDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      // 가져온 게시글 목록을 boardList state에 저장
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  if (boardList === null) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  // 게시글 목록이 있을 경우, 테이블로 화면을 출력함
  return (
    <>
      <div style={{ width: "1500px", marginLeft: "auto", marginRight: "auto" }}>
        <div className="row" style={{ marginTop: "40px" }}>
          <Table className="table table-hover">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>번호</th>
                <th width="40%">제목</th>
                <th style={{ textAlign: "center" }}>작성자</th>
                <th style={{ textAlign: "center" }}>작성일</th>
                <th style={{ textAlign: "center" }}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board) => (
                <tr key={board.boarTgNo}>
                  <td style={{ textAlign: "center" }}>{board.boardTgNo}</td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate({
                          pathname: "/together/BoardDetail/" + board.boardTgNo,
                          state: { board },
                        })
                      }
                    >
                      {board.boardTgTitle}
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>{board.boardTgMemId}</td>
                  <td style={{ textAlign: "center" }}>{board.boardTgDate}</td>
                  <td style={{ textAlign: "center" }}>{board.boardTgViews}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="warning"
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
            onClick={selectBoardList}
          >
            전체조회
          </Button>{" "}
          <Button
            variant="success"
            style={{ backgroundColor: "black" }}
            onClick={() => navigate("/together/write")}
          >
            글 작성하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default TogetherBoardList;
