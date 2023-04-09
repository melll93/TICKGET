import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectBoardDetailDB,
  updateBoardListDB
} from "../../axios/board/boardLogic";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardTgNo } = useParams();
  const [boardTgTitle, setTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgDate, setDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardTgContent, setContent] = useState(""); //사용자가 입력한 내용 담기

  const [board, setBoard] = useState({
    boardTgNo: 0,
    boardTgMemId: "",
    boardTgTitle: "",
    boardTgContent: "",
    boardTgDate: "",
  },);

  useEffect(() => {
    const asyncDB = async () => {
      const res = await selectBoardDetailDB({ boardTgNo });
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      console.log('asda = ', jsonDoc);
      setBoard({
        boardTgNo: jsonDoc.boardTgNo,
        boardTgMemId: jsonDoc.boardTgMemId,
        boardTgTitle: jsonDoc.boardTgTitle,
        boardTgContent: jsonDoc.boardTgContent,
        boardTgDate: jsonDoc.boardTgDate,
      });
      if (res.data) {
        console.log(jsonDoc);
        setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {
    };
  }, []);

  const updateBoard = async() => {

    if (!boardTgTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    const board ={
      boardTgNo: boardTgNo, // 게시글 번호
      boardTgTitle: boardTgTitle, // 제목 추가
      boardTgContent: boardTgContent, // 내용 추가
      boardTgDate: boardTgDate,
    }

    console.log('board = ', JSON.stringify(board));
    try{
      const res = await updateBoardListDB(board)
      console.log(res.data)
    } catch(error){
      console.log(error)
    }
    alert("게시글 수정 완료");
    navigate("/together")
  }
   
  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);
  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);
  const handleContent = useCallback((e) => {
    setContent(e);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="center">
        <Header />
        <br />
        <h2>게시글 훔쳐봐야지? 가야지?</h2>
        <div>
          <form method="post">
            <div>
              <label>수정 할 제목</label>
              <br/>
              <input id="board_tg_title" type="text" maxLength="50"
              value={boardTgTitle}
            style={{width:"300px",height:'40px' , margin:"10px",
            border:'1px solid lightGray'}}
            placeholder="수정할 제목을 입력해 주세요"
            onChange={(e) => {
              handleTitle(e.target.value);
            }}
            />
            </div>

            <div>
              <label>작성자</label>
              <span style={{ width: "300px", margin: "10px" }} type="text" name="boardTgMemId" required class="form-control form-control-lg" id="inputLarge">
                {board.boardTgMemId}
              </span>
            </div>
            
            <div>
              <label>수정된 날짜</label>
              <br/>
              <input id="board_tg_date" type="text" maxLength="50"
              value={boardTgDate}
            style={{width:"300px",height:'40px' , margin:"10px",
            border:'1px solid lightGray'}}
            placeholder="YYYY-MM-DD"
            onChange={(e) => {
              handleDate(e.target.value);
            }}
            />
            </div>

            <div>
              <label>수정할 내용</label>
              <br/>
              <input id="board_tg_date" type="text" maxLength="50"
              value={boardTgContent}
            style={{width: "300px", margin: "10px", height: "300px", fontSize: "20px"}}
            placeholder="수정할 내용을 입력해 주세요"
            onChange={(e) => {
              handleContent(e.target.value);
            }}
            />
            </div>

            <div>
              <label class="form-block">첨부파일</label>
              <input style={{ width: "300px", margin: "10px" }}
                type="file" name="attach" accept="image/*" multiple="multiple" class="form-control"/>
            </div>
            
            <div>
               <Button variant="success" style={{marginLeft:'10px'}}onClick={()=>{updateBoard()}}>수정하기</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
