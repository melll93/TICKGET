import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { selectBoardDetailDB, selectBoardListDB } from "../../axios/board/boardLogic";
import Write from "./Write";

const BoardDetail = () => {
  const navigate = useNavigate();
  // URL 파라미터에서 게시글 번호 가져오기
  const { boardNo } = useParams()

  // 게시글 정보를 담을 객체
  const [board, setBoard] = useState({
    boardNo: 0,
    memberId: "",
    boardTitle: "",
    boardContent: "",
    boardDate: "",
  });
  // 컴포넌트가 처음 로딩될 때, 백엔드 API를 호출하여 게시글 정보를 가져옴
  // useEffect(() => {
    
  //   jsonBoardList();
  // }, []);
  useEffect(() => {
    //파라미터로 넘어오는 deptno가 바뀌면 *다시 실행됨*
    const asyncDB = async () => {
      const res = await selectBoardDetailDB({ boardNo });
      console.log('여기보세요 =- ',res.data);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setBoard({
        boardNo: jsonDoc.boardNo,
        memberId: jsonDoc.memberId,
        boardTitle: jsonDoc.boardTitle,
        boardContent: jsonDoc.boardContent,
        boardDate: jsonDoc.boardDate,
      });
    };
    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    };
  }, [boardNo]);

// 게시글 정보 가져오기
const jsonBoardList = async () => {
  // axios를 사용하여 게시글 정보를 가져옴
  const res = await selectBoardListDB({boardNo}); // boardNo를 매개변수로 전달
  console.log('res =', res.data);
  console.log('boardNo =', boardNo)
  if (res.data) {
    // 가져온 게시글 정보를 board state에 저장
    setBoard(res.data);
  } else {
    console.log("게시글 조회 실패");
  }
};

/*   if (!board.boardTitle) {
    console.log(board.boardTitle)
    return <div>데이터를 불러오는 중입니다...</div>;
  } */
    return (
      <>
        <div>
          <h3>{board.boardTitle}</h3>
          <p>{board.memberId}</p>
          <p>{board.boardDate}</p>
          <p>{board.boardContent}</p>
        </div>
      </>
    );
  }

export default BoardDetail;
