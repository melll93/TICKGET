/* global daum */
/* global daum */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CarpoolDetailDB,
  updateCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";

const CarpoolUpdate = () => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const [boardCpTitle, setCarpoolTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpDate, setCarpoolDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpContent, setCarpoolContent] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpPlace, setBoardCpPlace] = useState(""); //사용자가 입력한 내용 담기

  const [carpool, setCarpool] = useState({
    boardCpNo: 0,
    boardCpMemId: "",
    boardCpTitle: "",
    boardCpContent: "",
    boardCpDate: "",
    boardCpPlace: "",
  });

  useEffect(() => {
    const asyncDB = async () => {
      const res = await CarpoolDetailDB({ boardCpNo });
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setCarpool({
        boardCpNo: jsonDoc.boardCpNo,
        boardCpMemId: jsonDoc.boardCpMemId,
        boardCpTitle: jsonDoc.boardCpTitle,
        boardCpContent: jsonDoc.boardCpContent,
        boardCpDate: jsonDoc.boardCpDate,
        boardCpPlace: jsonDoc.boardCpPlace,
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
      Swal.fire({
        title: "제목을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!boardCpDate) {
      Swal.fire({
        title: "날짜를 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!boardCpContent) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
      });
      return;
    }

    const carpool = {
      boardCpNo: boardCpNo, // 게시글 번호
      boardCpTitle: boardCpTitle, // 제목 추가
      boardCpContent: boardCpContent, // 내용 추가
      boardCpDate: boardCpDate,
      boardCpPlace: boardCpPlace,
    };

    console.log("carpool = ", JSON.stringify(carpool));
    try {
      const res = await updateCarpoolDB(carpool);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      title: "게시글 수정 완료",
      icon: "success",
    });
    navigate("/carpool");
  };

  const handleTitle = useCallback((e) => {
    setCarpoolTitle(e);
  }, []);

  const handleDate = (date) => {
    // "YYYY-MM-DD" 형식이 아닐 경우 에러 처리
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      /* alert("날짜 형식이 올바르지 않습니다."); */
      Swal.fire({
        title: "날짜 형식이 올바르지 않습니다.",
        icon: "warning",
      });
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

  const searchAddress = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        let address = "";
        let buildingName = "";
        if (data.userSelectedType === "R") {
          address = data.roadAddress + " " + data.buildingName; //도로명
        } else {
          address = data.jibunAddress; //지번
        }
        console.log(data);
        console.log(address);
        setBoardCpPlace(address);
        document.getElementById("place").value = address;
      },
    }).open();
  };

  const handlePlace = useCallback((value) => {
    setBoardCpPlace(value);
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
          <br />
          <div>
            <form method="post">
              <div>
                <label>수정 할 제목</label>
                <br />
                <input
                  id="board_cp_title"
                  type="text"
                  maxLength="100"
                  defaultValue={carpool.boardCpTitle}
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
                <span
                  maxLength="50"
                  defaultValue={carpool.boardCpDate}
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
                  // onChange={(e) => {
                  //   handleDate(e.target.value);
                  // }}
                />
              </div>

              <div>
                <label>수정할 내용</label>
                <br />
                <textarea
                  id="board_cp_date"
                  type="text"
                  maxLength="1000"
                  defaultValue={carpool.boardCpContent}
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

              {/* <div
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
              </div> */}
              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridPlace">
                  <h3>접선 장소</h3>
                  <Form.Control
                    required
                    id="place"
                    type="text"
                    placeholder="접선 장소를 입력하세요."
                    style={{ width: "98%", height: "50px" }}
                    onClick={() => {
                      searchAddress();
                    }}
                    onChange={(e) => {
                      handlePlace(e.target.value);
                    }}
                  />
                  {/* <MapContainer place={carpool.Place} /> */}
                  <Form.Control.Feedback type="invalid">
                    공연 장소를 입력해주세요.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

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
