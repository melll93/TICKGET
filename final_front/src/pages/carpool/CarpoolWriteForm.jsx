import React, { useCallback, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { insertCarpoolDB } from "../../axios/carpool/CarpoolLogic";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  BButton,
  ContainerDiv,
  FormDiv,
  HeaderDiv,
} from "../../styles/formStyle";
import LandingPage from "./Map/LandingPage";

const CarpoolWriteForm = ({ carpool }) => {
  //props를 넘어온 값 즉시 구조분해 할당하기

  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  //mem_id를 받아오자
  //const[writer, setWriter]= useState(''); //작성자
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성
  const [secret, setSecret] = useState(false); //비밀글
  const [tTitle, setTTitle] = useState("일반"); //qna_type
  const [views, setViews] = useState("일반"); //조회수
  const [types] = useState(["일반", "결제", "양도", "회원", "수업"]); //qna_type의 라벨값
  const [files, setFiles] = useState([]); //파일처리
  const quillRef = useRef();

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleFiles = useCallback(
    (value) => {
      setFiles([...files, value]);
    },
    [files]
  );

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  // mem_id 받아온 후
  // const handleWriter = useCallback((e) => {
  //   setWriter(e);
  // },[]);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  }, []);

  const insertCarpool = async () => {
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
    console.log("insertCarpool");
    const carpool = {
      carpoolTitle: title, // 제목 추가
      carpoolContent: content, // 내용 추가
      // carpoolSecret: secret ? "true" : "false",
      // carpoolType: tTitle,
      // carpoolViews: views,
      // carpoolMemId: sessionStorage.getItem("id"),
      carpoolDate: date,
    };
    // 사용자가 입력한 값 넘기기 -@RequestBody로 처리됨
    // inser here
    try {
      const res = await insertCarpoolDB(carpool);
      console.log(res.data);
      // 성공시에 페이지 이동처리하기
      window.location.replace("/carpool");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <ContainerDiv>
        <HeaderDiv>
          <h3>Carpool 글작성</h3>
        </HeaderDiv>
        <FormDiv>
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
                >
                  <span style={{ fontSize: "14px" }}>비밀글</span>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    style={{ paddingLeft: "46px" }}
                    onClick={() => {
                      setSecret(!secret);
                    }}
                  />
                </div>
                <BButton
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    insertCarpool();
                  }}
                >
                  글쓰기
                </BButton>
              </div>
            </div>

            <input
              id="carpool_title"
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

            {/* mem_id를 받아오자 */}
            {/* <input id="board_writer" type="text" maxLength="50" placeholder="작성자?"
            style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleWriter(e.target.value)}}/> */}
            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <h3>날짜</h3>
            <input
              style={{ width: "100%" }}
              type="date"
              className="form-control"
              id="festStartday"
              name="startDay"
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />
            <label htmlFor="floatingInput" />

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h3>상세내용</h3>
            {/* <CarpoolQuillEditor
              value={content}
              handleContent={handleContent}
              quillRef={quillRef}
              files={files}
              handleFiles={handleFiles}
            /> */}

            <div
              style={{
                border: "1px solid lightGray",
                borderRadius: "10px",
                width: "auto",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {<LandingPage />}
            </div>
            <br />
            {/* <CarpoolFileInsert files={files} /> */}
          </div>
          <br />

          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "20px" }}>
              <Button
                onClick={() => window.history.back()}
                style={{ backgroundColor: "black" }}
              >
                뒤로가기
              </Button>
              <Button
                style={{ marginLeft: "10px", backgroundColor: "black" }}
                onClick={() => navigate("/carpool")}
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

export default CarpoolWriteForm;
