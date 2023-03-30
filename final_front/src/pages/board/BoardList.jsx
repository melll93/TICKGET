import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  deleteBoardListDB,
  jsonboardListDB,
} from "../../axios/board/boardLogic";
import "bootstrap/dist/css/bootstrap.min.css";

const BoardList = () => {
  console.log("BoardList");
  const [checkedItems, setCheckedItems] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    jsonBoardList();
  }, []);

  //전체조회(Json으로)
  /* BACK- BoardDto - @AllArgsConstructor selectBoardList 얘는가능 */

  const jsonBoardList = async () => {
    const res = await jsonboardListDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  console.log(boardList);

  //글 수정하기
  const boardUpdate = () => {};

  //글삭제하기
  /* BACK- BoardDto - @AllArgsConstructor deleteBoardList 얘는 불 가능 */
  /* BACK- BoardDto - @RequiredArgsConstructor,  @NoArgsConstructor deleteBoardList 얘는 가능 */
  const boardDelete = async () => {
    if (checkedItems.length === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 삭제 로직
      const res = await deleteBoardListDB(checkedItems);
      console.log(res);
      if (res.data === "success") {
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
            <tr key={board.board_no}>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  value={board.board_no}
                  checked={checkedItems.includes(board.board_no)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = parseInt(e.target.value);
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
              <td style={{ textAlign: "center" }}>{board.board_no}</td>
              <td>{board.board_title}</td>
              <td style={{ textAlign: "center" }}>{board.member_id}</td>
              <td style={{ textAlign: "center" }}>{board.board_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        style={{ backgroundColor: "black", color: "white" }}
        onClick={jsonBoardList}
      >
        {" "}
        전체조회{" "}
      </Button>
      &nbsp;
      <Button
        style={{ backgroundColor: "black" }}
        onClick={() => navigate("/together/write")}
      >
        글 작성하기
      </Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={boardDelete}>
        {" "}
        글 삭제하기{" "}
      </Button>
    </div>
  );
};

export default BoardList;
