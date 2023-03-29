import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
    console.log('BoardList')
    const navigate = useNavigate()


    //전체조회
    const boardList=()=>{

    }

    //글작성하기
    const boardWrite=()=>{
      navigate("write")
    }

    //글 수정하기
    const boardUpdate=()=>{

    }

    //글삭제하기
    const boardDelete=()=>{

    }
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
          <tr>
            <td style={{ textAlign: "center" }}>1</td>
            <td>게시글1</td>
            <td style={{ textAlign: "center" }}>artistJay</td>
            <td style={{ textAlign: "center" }}>2023-03-26</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>2</td>
            <td>게시글2</td>
            <td style={{ textAlign: "center" }}>artistJay</td>
            <td style={{ textAlign: "center" }}>2023-03-26</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>3</td>
            <td>게시글2</td>
            <td style={{ textAlign: "center" }}>artistJay</td>
            <td style={{ textAlign: "center" }}>2023-03-26</td>
          </tr>
        </tbody>
      </Table>
      <Button style={{ backgroundColor: "black", color:"white" }} onClick={boardList}>전체조회</Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }}onClick={boardWrite}>글 작성하기</Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={boardUpdate}>글 수정하기</Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={boardDelete}>글 삭제하기</Button>
    </div>
  );
};

export default BoardList;
