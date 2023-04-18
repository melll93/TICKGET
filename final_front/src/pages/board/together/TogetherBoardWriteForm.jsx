import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { insertTogetherDB } from "../../../axios/board/together/TogetherLogic";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { BButton, ContainerDiv, FormDiv } from "../../../styles/formStyle";
import Sidebar from "../../../components/Sidebar";

const TogetherBoardWriteForm = ({ board_together }) => {
  //props를 넘어온 값 즉시 구조분해 할당하기

  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  //mem_id를 받아오자
  //const[writer, setWriter]= useState(''); //작성자
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성
  const [writer, setWriter] = useState(""); //내용작성
  const [types] = useState(["일반", "결제", "양도", "회원", "수업"]); //qna_type의 라벨값

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);
  const handleWriter = useCallback((e) => {
    setWriter(e);
  }, []);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);

  const insertBoardList = async () => {
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!date) {
      alert("날짜를 입력해주세요.");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    console.log("insertBoardList");
    // console.log(secret); //true
    console.log(typeof secret); //boolean타입 출력
    const board = {
      boardTgTitle: title, // 제목 추가
      boardTgContent: content, // 내용 추가
      boardTgMemId: sessionStorage.getItem("id"),
      boardTgDate: date,
    };
    // 사용자가 입력한 값 넘기기 -@RequestBody로 처리됨
    // inser here
    try {
      const res = await insertTogetherDB(board);
      console.log(res.data);
      // 성공시에 페이지 이동처리하기
      window.location.replace("/together");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <FormDiv>
          <h3>Together 글작성</h3>
          <br />
          <div style={{ width: "100%", maxWidth: "2000px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h2>제목</h2>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "10px",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                ></div>
                <BButton
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    insertBoardList();
                  }}
                >
                  글쓰기
                </BButton>
              </div>
            </div>

            <input
              id="board_title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              onChange={(e) => {
                handleTitle(e.target.value);
              }}
            />
            <br />
            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h2>작성자</h2>
            {/* mem_id를 받아오자 */}
            <span
              id="board_writer"
              type="text"
              maxLength="50"
              placeholder="작성자?"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              value={sessionStorage.getItem("id")}
              onChange={(e) => {
                handleWriter(e.target.value);
              }}
            />
            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <h3>날짜</h3>
            <input
              type="date"
              className="form-control"
              id="festStartday"
              name="startDay"
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h3>상세내용</h3>
            <input
              style={{
                width: "98%",
                margin: "10px",
                height: "300px",
                fontSize: "20px",
              }}
              value={content}
              handleContent={handleContent}
              type="html"
              name="carpoolContent"
              required
              rows="10"
              className="form-control"
              id="exampleTextarea"
              onChange={(e) => {
                handleContent(e.target.value);
              }}
            ></input>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "20px" }}>
              <Button
                style={{ backgroundColor: "black" }}
                onClick={() => window.history.back()}
              >
                뒤로가기
              </Button>
              <Button
                style={{ marginLeft: "10px", backgroundColor: "black" }}
                onClick={() => navigate("/together")}
              >
                목록으로
              </Button>
            </div>
          </div>
        </FormDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default TogetherBoardWriteForm;
