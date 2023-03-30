import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    jsonboardListDB
} from "../../axios/board/boardLogic";

const BoardDetail = () => {
  const navigate = useNavigate();
  // URL 파라미터에서 게시글 번호 가져오기
  const { board_no } = useParams();
  const location = useLocation();

  // 게시글 정보를 담을 객체
  const [board, setBoard] = useState({});

  // 컴포넌트가 처음 로딩될 때, 백엔드 API를 호출하여 게시글 정보를 가져옴
  useEffect(() => {
    jsonBoardList();
  }, []);

  // 게시글 정보 가져오기
  const jsonBoardList = async () => {
    // axios를 사용하여 게시글 정보를 가져옴
    const res = await jsonboardListDB(board_no);
    console.log(res.data);
    if (res.data) {
      // 가져온 게시글 정보를 board state에 저장
      setBoard(res.data);
    } else {
      console.log("게시글 조회 실패");
    }
  };

  if (!board.board_title) {
    console.log(board)
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  // 게시글 정보를 화면에 출력
  return (
    <>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Button onClick={() => window.history.back()}>뒤로가기</Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => navigate("/together")}>목록으로
          </Button>
    </div>
        <h3>{board.board_title}</h3>
        <p>{board.member_id}</p>
        <p>{board.board_date}</p>
        <p>{board.board_content}</p>
    </div>
    </>
  );
};

export default BoardDetail;
