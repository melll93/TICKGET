import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  carpoolViewUpDB,
  selectCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";

const CarpoolBoardList = () => {
  console.log("CarpoolBoardList");
  const navigate = useNavigate();
  const [carpoolList, setCarpoolList] = useState([]);
  useEffect(() => {
    selectCarpoolList();
  }, []);

  // 전체 게시글 조회
  const selectCarpoolList = async () => {
    const res = await selectCarpoolDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setCarpoolList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  const updateViews = async (boardCpNo) => {
    console.log("boardCpNo넌 누구야? " + boardCpNo);
    await carpoolViewUpDB(boardCpNo);
    await selectCarpoolList();
  };

  if (carpoolList === null) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div>
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
              {carpoolList.map((carpool) => (
                <tr key={carpool.boardCpNo}>
                  <td style={{ textAlign: "center" }}>{carpool.boardCpNo}</td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateViews(carpool.boardCpNo);
                        navigate({
                          pathname:
                            "/carpool/carpoolDetail/" + carpool.boardCpNo,
                          state: { carpool },
                        });
                      }}
                    >
                      {carpool.boardCpTitle}
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {carpool.boardCpMemId}
                  </td>
                  <td style={{ textAlign: "center" }}>{carpool.boardCpDate}</td>
                  <td style={{ textAlign: "center" }}>
                    {carpool.boardCpViews}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
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
          style={{ backgroundColor: "black", color: "white" }}
          onClick={selectCarpoolList}
        >
          전체조회
        </Button>
        &nbsp;
        <Button
          variant="success"
          style={{ backgroundColor: "black" }}
          onClick={() => navigate("/carpool/write")}
        >
          글 작성하기
        </Button>
        &nbsp;
      </div>
    </div>
  );
};

export default CarpoolBoardList;
