import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate()
  const success=()=>{
    alert("작성 성공")
    navigate("/together")
  }
  
  const fail=()=>{
    alert("작성 실패")
    navigate("/together")
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력하세요" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" placeholder="내용을 입력하세요" />
        </Form.Group>
      </Form>
      <Button style={{ backgroundColor: "black" }} onClick={success}>작성완료</Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={fail} >취소</Button>
    </div>
  );
};

export default Write;
