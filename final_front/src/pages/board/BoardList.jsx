import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { jsonboardListDB } from "../../axios/board/boardLogic";
import "bootstrap/dist/css/bootstrap.min.css";

const BoardList = () => {
  console.log("BoardList");
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    jsonBoardList();
  }, []);

  //전체조회(Json으로)
  const jsonBoardList = async () => {
    const res = await jsonboardListDB();
    console.log(res.data);
    if (res.data) {
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };
  
  //글 수정하기
  const boardUpdate = () => {};

  //글삭제하기
  const boardDelete = () => {};

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center", width: "80px" }}>번호</th>
            <th>제목</th>
            <th style={{ textAlign: "center", width: "180px" }}>작성자</th>
            <th style={{ textAlign: "center", width: "250px" }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.board_no}>
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
        전체조회
      </Button>
      &nbsp;
      <Button
        style={{ backgroundColor: "black" }}
        onClick={() => navigate("/together/write")}
      >
        글 작성하기
      </Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={boardUpdate}>
        글 수정하기
      </Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={boardDelete}>
        글 삭제하기
      </Button>
    </div>
  );
};

export default BoardList;