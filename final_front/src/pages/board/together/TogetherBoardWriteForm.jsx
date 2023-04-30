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
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const minute = currentDate.getMinutes().toString().padStart(2, "0");
  const second = currentDate.getSeconds().toString().padStart(2, "0");
  const min = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

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
      boardTgMemId: _userData?.memberId,
      boardTgDate: min,
    };
    console.log(board);
    // 사용자가 입력한 값 넘기기 -@RequestBody로 처리됨
    try {
      const res = await insertTogetherDB(board);
      console.log(res.data);
      Swal.fire({
        title: "게시글이 작성이 완료되었습니다.",
        icon: "success",
      });
      navigate("/together");
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
                  글 작성하기
                </Button>
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "정말로 뒤로 가시겠습니까?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "black",
                      cancelButtonColor: "black",
                      confirmButtonText: "네",
                      cancelButtonText: "아니오",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.history.back();
                      }
                    });
                  }}
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                >
                  뒤로가기
                </Button>
              </div>
            </div>

            <input
              id="board_title"
              type="text"
              maxLength="100"
              placeholder="제목을 입력하세요."
              style={{
                marginLeft: "10px",
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
            <h3>작성자</h3>
            {(() => {
              if (_userData?.memberId) {
                return (
                  <span
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: "25px",
                      marginLeft: "20px",
                    }}
                  >
                    {_userData.memberId}
                  </span>
                );
              } else {
                Swal.fire({
                  title: "로그인 후 이용해주세요.",
                  icon: "warning",
                });
                window.location.href = "/login"; // 로그인 페이지로 이동
                return null;
              }
            })()}

            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <h3>날짜</h3>
            <input
              className="form-control form-control-lg"
              step="1"
              readOnly
              style={{ width: "98%", margin: "10px" }}
              value={min}
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
