/* global daum */
import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/database";
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
import { ContainerDiv } from "../../../styles/formStyle";

const CarpoolUpdate = () => {
  const navigate = useNavigate();
  const { boardCpNo } = useParams();
  const [boardCpTitle, setCarpoolTitle] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpDate, setCarpoolDate] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpContent, setCarpoolContent] = useState(""); //사용자가 입력한 내용 담기
  const [boardCpPlace, setBoardCpPlace] = useState(""); //사용자가 입력한 내용 담기

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const min = `${year}-${month}-${day}`;

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
    // if (!boardCpDate) {
    //   Swal.fire({
    //     title: "날짜를 입력해주세요",
    //     icon: "warning",
    //   });
    //   return;
    // }
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
      boardCpDate: min,
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

  // const handleDate = (date) => {
  //   // "YYYY-MM-DD" 형식이 아닐 경우 에러 처리
  //   const regex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!regex.test(date)) {
  //     /* alert("날짜 형식이 올바르지 않습니다."); */
  //     Swal.fire({
  //       title: "날짜 형식이 올바르지 않습니다.",
  //       icon: "warning",
  //     });
  //     return;
  //   }
  //   // "YYYY-MM-DD" 형식으로 변환
  //   const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  //   // 변환된 값을 상태 변수에 저장
  //   setCarpoolDate(formattedDate);
  //   // setDate();
  // };

  const handleDate = useCallback((e) => {
    setCarpoolDate(e);
  }, []);

  const handleContent = useCallback((e) => {
    setCarpoolContent(e);
  }, []);

  /*************** fireBase ***************/
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: (process.env.FIREBASE_DATABASE_URL =
      "https://finalproject-85e01-default-rtdb.asia-southeast1.firebasedatabase.app"),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  const [data, setData] = useState({});
  const [carpool1, setCarpool1] = useState({
    boardCpNo: "",
    max: "",
    now: "",
  });

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  useEffect(() => {
    const database = firebase.database();
    database.ref().on("value", (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
    return () => {
      database.ref().off();
    };
  }, []);

  const handleInputChange = (event) => {
    setCarpool1({
      ...carpool1,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSaveData = () => {
    const count = 1;
    const maxVal = parseInt(carpool1.max);

    firebase
      .database()
      .ref(`carpoolList/${boardCpNo}`)
      .once("value")
      .then((snapshot) => {
        Swal.fire({
          title: "카풀인원 수정 완료.",
          icon: "success",
        });
        if (snapshot.exists()) {
          const now = snapshot.val().now;
          const currentCount = snapshot.val().count;
          if (now < maxVal && currentCount < maxVal) {
            const newNow = now + count;
            const newCount = currentCount + count;
            if (newNow <= maxVal && newCount <= maxVal) {
              firebase.database().ref(`carpoolList/${boardCpNo}`).update({
                max: maxVal,
                now: 1,
                count: 1,
              });
            }
          }
        } else {
          firebase.database().ref(`carpoolList/${boardCpNo}`).update({
            max: maxVal,
            now: 1,
            count: 1,
          });
        }
      });
  };
  /*************** fireBase ***************/

  /********** 위치찾기 시작 **********/
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

  /********** 위치찾기 종료 **********/
  return (
    <div>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "100px" }}></div>
        <br />
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            width: "90%",
            border: "2px solid lightGray",
            borderRadius: "20px",
            padding: "10px",
            maxWidth: "1500px",
            minHeight: "650px",
            justifyContent: "space-between",
          }}
        >
          <h2>카풀 게시판 수정하기</h2>
          <br />
          <div>
            <div method="post">
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

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

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

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

              <div>
                <label>수정된 날짜</label>
                <br />
                <input
                  id="board_cp_date"
                  // type="date"
                  // defaultValue={carpool.boardCpDate}
                  maxLength="50"
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  value={min}
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                />
              </div>

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

              <h3 style={{ marginBottom: "20px" }}>Carpool 최대 인원</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h5 style={{ marginLeft: "10px" }}>최대 인원</h5>

                <input
                  style={{ width: "auto", marginLeft: "10px" }}
                  className="form-control"
                  type="text"
                  id="max"
                  name="max"
                  placeholder="최대인원"
                  onChange={handleInputChange}
                />

                <Button
                  style={{
                    width: "auto",
                    marginLeft: "10px",
                    backgroundColor: "black",
                    marginTop: "0px",
                  }}
                  className="form-control"
                  type="text"
                  onClick={handleSaveData}
                >
                  카풀 인원 수정
                </Button>
              </div>

              <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

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
          </div>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default CarpoolUpdate;
