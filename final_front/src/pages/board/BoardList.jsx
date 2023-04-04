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
  /* BACK- BoardDto - @AllArgsConstructor selectBoardList 얘는가능 */
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


  // 게시글 수정하기 (아직 미구현)
  const boardUpdate = () => {};

  // 게시글 삭제하기
  /* BACK- BoardDto - @AllArgsConstructor deleteBoardList 얘는 불 가능 */
  /* BACK- BoardDto - @RequiredArgsConstructor,  @NoArgsConstructor deleteBoardList 얘는 가능 */
  const boardDelete = async () => {
    if (checkedItems.length === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 삭제할 게시글들의 번호들을 전달하여, axios를 사용하여 백엔드에서 삭제 처리
      const res = await deleteBoardListDB(checkedItems);
      console.log(res);
      if (res.data) {
        // 삭제가 성공하면 게시글 목록을 다시 불러와서 화면을 갱신함
        alert("삭제되었습니다.");
        jsonBoardList();
        setCheckedItems([]);
      } else {
        alert("삭제 실패");
      }
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
          {boardList.map((board_together) => (
            <tr key={board_together.boarTgdNo}>
              <td style={{ textAlign: "center" }}>
                <input type="checkbox" value={board_together.boardTgNo} checked={checkedItems.includes(board_together.boardTgNo)}
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
              <td style={{ textAlign: "center" }}>{board_together.boardTgNo}</td>
              <td>
                <button
                  style={{border: "none",background: "none",color: "blue",cursor: "pointer",}}
                  onClick={() =>navigate({
                    pathname: "/together/BoardDetail/"+board_together.boardTgNo,
                    state:{board_together}
                  })}>
                  {board_together.boardTgTitle}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>{board_together.boardTgMemId}</td>
              <td style={{ textAlign: "center" }}>{board_together.boardTgDate}</td>
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
      <Button style={{ backgroundColor: "black" }} onClick={boardDelete}>
        글 삭제하기
      </Button>
    </div>
  );
};

export default BoardList;