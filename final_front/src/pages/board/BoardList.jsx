import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  deleteBoardListDB, selectBoardListDB,
} from "../../axios/board/boardLogic";

const BoardList = () => {
  console.log("BoardList");
  const navigate = useNavigate();
  // 현재 체크된 항목들의 배열
  const [checkedItems, setCheckedItems] = useState([]);
  // 게시글 목록을 담을 배열
  const [boardList, setBoardList] = useState([]);
  // 컴포넌트가 처음 로딩될 때, 백엔드 API를 호출하여 게시글 목록을 가져옴
  useEffect(() => {
    jsonBoardList();
  }, []);

  // 전체 게시글 조회
  const jsonBoardList = async () => {
    // axios를 사용하여 게시글 목록을 가져옴
    const res = await selectBoardListDB();
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
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center", width: "80px" }}>구분</th>
            <th style={{ textAlign: "center", width: "80px" }}>번호</th>
            <th>제목</th>
            <th style={{ textAlign: "center", width: "180px" }}>작성자</th>
            <th style={{ textAlign: "center", width: "250px" }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.boarTgdNo}>
              <td style={{ textAlign: "center" }}>
                <input type="checkbox" value={board.boardTgNo} checked={checkedItems.includes(board.boardTgNo)}
                  onChange={(e) => {const checked = e.target.checked;const value = parseInt(e.target.value);
                    if (checked) {
                      setCheckedItems([...checkedItems, value]);
                    } else {
                      setCheckedItems(
                        checkedItems.filter((item) => item !== value)
                      );
                    }
                  }}
                />
              </td>
              <td style={{ textAlign: "center" }}>{board.boardTgNo}</td>
              <td>
                <button
                  style={{border: "none",background: "none",color: "blue",cursor: "pointer",}}
                  onClick={() =>navigate({
                    pathname: "/together/BoardDetail/"+board.boardTgNo,
                    state:{board}
                  })}>
                  {board.boardTgTitle}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>{board.boardTgMemId}</td>
              <td style={{ textAlign: "center" }}>{board.boardTgDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="warning" style={{ backgroundColor: "black", color: "white" }}onClick={jsonBoardList}>
        전체조회
      </Button>
      &nbsp;
      <Button variant="success" style={{ backgroundColor: "black" }} onClick={() => navigate("/together/write")}>
        글 작성하기
      </Button>
      &nbsp;

    </div>
  );
};

export default BoardList;