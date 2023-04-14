import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  CarpoolDetailDB,
  updateCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";
import LandingPage from "./Map/LandingPage";

const CarpoolUpdate = () => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const [boardCpTitle, setCarpoolTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpDate, setCarpoolDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpContent, setCarpoolContent] = useState(""); //사용자가 입력한 내용 담기

  const [carpool, setCarpool] = useState({
    boardCpNo: 0,
    boardCpMemId: "",
    boardCpTitle: "",
    boardCpContent: "",
    boardCpDate: "",
  });

  useEffect(() => {
    const asyncDB = async () => {
      const res = await CarpoolDetailDB({ boardCpNo });
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      console.log("asda = ", jsonDoc);
      setCarpool({
        boardCpNo: jsonDoc.boardCpNo,
        boardCpMemId: jsonDoc.boardCpMemId,
        boardCpTitle: jsonDoc.boardCpTitle,
        boardCpContent: jsonDoc.boardCpContent,
        boardCpDate: jsonDoc.boardCpDate,
      });
      if (res.data) {
        console.log(jsonDoc);
        setCarpool(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  const updateCarpool = async () => {
    if (!boardCpTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!boardCpDate) {
      alert("날짜를 입력해 주세요.");
      return;
    }

    if (!boardCpContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    const carpool = {
      boardCpNo: boardCpNo, // 게시글 번호
      boardCpTitle: boardCpTitle, // 제목 추가
      boardCpContent: boardCpContent, // 내용 추가
      boardCpDate: boardCpDate,
    };

    console.log("carpool = ", JSON.stringify(carpool));
    try {
      const res = await updateCarpoolDB(carpool);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    alert("게시글 수정 완료");
    navigate("/carpool");
  };

  const handleTitle = useCallback((e) => {
    setCarpoolTitle(e);
  }, []);

  const handleDate = (date) => {
    // "YYYY-MM-DD" 형식이 아닐 경우 에러 처리
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }
    // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    // 변환된 값을 상태 변수에 저장
    setCarpoolDate(formattedDate);
    // setDate();
  };

  const handleContent = useCallback((e) => {
    setCarpoolContent(e);
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
      <div style={{ height: "100px" }}></div>
        <br />
        <FormDiv style={{ width: "98%", margin: "10px" }}>
        <h2>카풀 게시판 수정하기</h2>
        <br/>
          <div>
            <form method="post">
              <div>
                <label>수정 할 제목</label>
                <br />
                <input
                  id="board_cp_title"
                  type="text"
                  maxLength="50"
                  value={boardCpTitle}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 제목을 입력해 주세요"
                  onChange={(e) => {
                    handleTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="boadrCpMemId"
                  required
                  class="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.boardCpMemId}
                </span>
              </div>

              <div>
                <label>수정된 날짜</label>
                <br />
                <input
                  id="board_cp_date"
                  type="date"
                  maxLength="50"
                  value={boardCpDate}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder={
                    "YYYY-MM-DD 형식으로 입력해주세요. ex) : " +
                    new Date().toISOString().substr(0, 10)
                  }
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>수정할 내용</label>
                <br />
                <textarea
                  id="board_cp_date"
                  type="text"
                  maxLength="50"
                  value={boardCpContent}
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 내용을 입력해 주세요"
                  onChange={(e) => {
                    handleContent(e.target.value);
                  }}
                />
              </div>

              <div
                style={{
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                  width: "98%",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LandingPage />
              </div>

              <div>
                <label class="form-block">첨부파일</label>
                <input
                  style={{ width: "98%", margin: "10px" }}
                  type="file"
                  name="attach"
                  accept="image/*"
                  multiple="multiple"
                  class="form-control"
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    updateCarpool();
                  }}
                >
                  수정하기
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    if (window.confirm("정말 돌아가시겠습니까?")) {
                      navigate({
                        pathname: "/carpool/carpoolDetail/" + carpool.boardCpNo,
                        state: { carpool },
                      });
                    }
                  }}
                >
                  돌아가기
                </Button>
              </div>
            </form>
          </div>
        </FormDiv>
      </ContainerDiv>
    </div>
  );
};

export default CarpoolUpdate;
