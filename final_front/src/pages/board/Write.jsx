import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { boardInsertDB } from "../../axios/board/boardLogic";

const Write = () => {
  const navigate = useNavigate()

  const [board_no, setBoardNo] = useState("")
  const [member_id, setMemberId] = useState("")
  const [board_title, setBoardTitle] = useState("")
  const [board_content, setBoardContent] = useState("")
  const [board_date, setBoardDate] = useState("")
  const [board_views, setBoardViews] = useState("")
  const [board_super_no, setBoardSuperNo] = useState("")
  const [board_group_no, setBoardGroupNo] = useState("")
  const [board_depth, setBoardDepth] = useState("")
  const [board_reply_count, setBoardReplyCount] = useState("")
  const [board_check, setBoardCheck] = useState("")

  //글작성하기
  const boardInsert = async()=>{
    const board={
      board_no,
      member_id,
      board_title,
      board_content,
      board_date,
      board_views,
      board_super_no,
      board_group_no,
      board_depth,
      board_reply_count,
      board_check,
    }
    const res = await boardInsertDB(board)
    // window.location.replace("/board")
    navigate("/together")
}

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
          <Form.Control type="text" placeholder="내용을 입력하세요" />
        </Form.Group>

        
      </Form>
      <Button style={{ backgroundColor: "black" }} onClick={success}>작성완료</Button>
      &nbsp;
      <Button style={{ backgroundColor: "black" }} onClick={fail} >취소</Button>
    </div>
  );
};

export default Write;
