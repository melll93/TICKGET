import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { jsonboardListDB } from "../../axios/board/boardLogic";

const BoardList = () => {
  console.log("BoardList");
  const [deptList, setDeptList] = useState([]);
  const navigate = useNavigate();

  //전체조회(Json으로)
  const jsonBoardList = async () => {
    const res = await jsonboardListDB({ deptno: 0 });
    console.log(res.data);
    if (res.data) {
      setDeptList(res.data);
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
        {}
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>1</td>
            <td>게시글1</td>
            <td style={{ textAlign: "center" }}>artistJay</td>
            <td style={{ textAlign: "center" }}>2023-03-26</td>
          </tr>
        </tbody>
        {/* dmalsmfal;mfa; */}
      </Table>
      <Button
        style={{ backgroundColor: "black", color: "white" }}
        onClick={jsonBoardList}
      >
        전체조회
      </Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={()=>navigate("/together/write")}>
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
