import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { insertTogetherDB } from "../../../axios/board/together/TogetherLogic";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";

const TogetherBoardWriteForm = ({ board_together }) => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData);
  //props를 넘어온 값 즉시 구조분해 할당하기

  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  //mem_id를 받아오자
  //const[writer, setWriter]= useState(''); //작성자
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성
  const [writer, setWriter] = useState(""); //작성자?

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);

  const insertBoardList = async () => {
    if (!title) {
      Swal.fire({
        title: "제목을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    if (!date) {
      Swal.fire({
        title: "날짜을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    if (!content) {
      Swal.fire({
        title: "내용을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    console.log("insertBoardList");
    const board = {
      boardTgTitle: title, // 제목 추가
      boardTgContent: content, // 내용 추가
      boardTgMemId: _userData.memberId,
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
        <div style={{ height: "150px" }}></div>
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
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    insertBoardList();
                  }}
                >
                  글쓰기
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm("정말로 뒤로 가시겠습니까?")) {
                      window.history.back();
                    }
                  }}
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                >
                  뒤로가기
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    if (window.confirm("정말 목록으로 가시겠습니까?")) {
                      navigate("/together");
                    }
                  }}
                >
                  목록으로
                </Button>
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
            <span
              id="board_writer"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
            >
              {_userData.memberId}
            </span>
            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <h3>날짜</h3>
            <input
              className="form-control form-control-lg"
              id="inputLarge"
              type="datetime-local"
              style={{ width: "98%", margin: "10px" }}
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h3>상세내용</h3>
            <textarea
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
            ></textarea>
          </div>
          <br />
        </FormDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default TogetherBoardWriteForm;
