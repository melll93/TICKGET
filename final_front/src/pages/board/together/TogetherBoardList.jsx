import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  selectTogetherDB,
  togetherViewUpDB,
} from "../../../axios/board/together/TogetherLogic";
import CommonPagination from "../../../components/CommonPagination";

const TogetherBoardList = (board) => {
  console.log("BoardList");
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage] = useState(15);

  useEffect(() => {
    selectBoardList();
  }, []);

  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (boardList) => {
    let currentFest = 0;
    currentFest = boardList.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  const selectBoardList = async () => {
    const res = await selectTogetherDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const updateViews = async (boardTgNo) => {
    console.log("boardTgNo넌 누구야? " + boardTgNo);
    await togetherViewUpDB(boardTgNo);
    console.log("updateViews의 boardTgNo : ", boardTgNo);
    await selectBoardList();
  };

  if (boardList === null) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <div style={{ width: "1200px", marginLeft: "auto", marginRight: "auto" }}>
        <div className="row" style={{ marginTop: "40px" }}>
          <Table className="table table-hover">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>번호</th>
                <th>제목</th>
                <th style={{ textAlign: "center" }}>작성자</th>
                <th style={{ textAlign: "center" }}>작성일</th>
                <th style={{ textAlign: "center" }}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {currentFest(boardList).map((board) => (
                <tr key={board.boardTgNo}>
                  <td style={{ textAlign: "center" }}>{board.boardTgNo}</td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateViews(board.boardTgNo);
                        navigate({
                          pathname: "/together/BoardDetail/" + board.boardTgNo,
                          state: { board },
                        });
                      }}
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

        <CommonPagination
          pagination={setPage}
          perPage={perPage}
          totalItems={boardList.length}
        ></CommonPagination>

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
