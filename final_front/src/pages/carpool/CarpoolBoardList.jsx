import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { selectCarpoolDB } from "../../axios/carpool/CarpoolLogic";

const CarpoolBoardList = () => {
  console.log("CarpoolBoardList");
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    selectCarpoolList();
  }, []);

  // 전체 게시글 조회
  const selectCarpoolList = async () => {
    const res = await selectCarpoolDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
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
            <th style={{ textAlign: "center", width: "80px" }}>번호</th>
            <th>제목</th>
            <th style={{ textAlign: "center", width: "180px" }}>작성자</th>
            <th style={{ textAlign: "center", width: "250px" }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((carpool) => (
            <tr key={carpool.carpoolNo}>
              <td style={{ textAlign: "center" }}>{carpool.carpoolNo}</td>
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
                      pathname: "/carpool/carpoolDetail/" + carpool.carpoolNo,
                      state: { carpool },
                    })
                  }
                >
                  {carpool.carpoolTitle}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>{carpool.carpoolMemId}</td>
              <td style={{ textAlign: "center" }}>{carpool.carpoolDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
  );
};

export default CarpoolBoardList;
