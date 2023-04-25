/* global daum */
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { ContainerDiv, FormDiv } from "../../../styles/formStyle";

import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/database";
import {
  getBoardCpNoDB,
  insertCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import Footer from "../../../components/Footer";

const CarpoolWriteForm = (/* { carpool } */) => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData);
  //props를 넘어온 값 즉시 구조분해 할당하기

  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  const [date, setDate] = useState(""); //날짜
  const [content, setContent] = useState(""); //내용작성
  const [place, setPlace] = useState(""); //판매할 티켓의 공연장소

  const [boardCpNo, setBoardCpNo] = useState();

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  useEffect(() => {
    const asyncDB = async () => {
      const res = await getBoardCpNoDB({});
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);

      setBoardCpNo(result);
      if (res.data) {
        console.log(jsonDoc);
        // setBoard(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  const handleDate = useCallback((e) => {
    setDate(e);
  }, []);

  const handlePlace = useCallback((e) => {
    setPlace(e);
  }, []);

  const insertCarpool = async () => {
    if (!title) {
      Swal.fire({
        title: "제목을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!date) {
      Swal.fire({
        title: "날짜를 입력해주세요",
        icon: "warning",
      });
      return;
    }
    if (!content) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
      });
      return;
    }
    const carpool = {
      boardCpTitle: title, // 제목 추가
      boardCpContent: content, // 내용 추가
      boardCpMemId: _userData?.memberId,
      boardCpDate: date,
      boardCpNo: boardCpNo,
      boardCpPlace: place,
    };
    console.log(carpool);
    try {
      const res = await insertCarpoolDB(carpool);
      console.log("insertCarpoolDB : ", res.data);
      handleSaveData();
      window.location.replace("/carpool");
    } catch (error) {
      console.log(error);
    }
  };

  /***************** 위치찾기 *****************/
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
        setPlace(address);
        document.getElementById("place").value = address;
      },
    }).open();
  };
  /***************** 위치찾기 *****************/

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
  const [carpool, setCarpool] = useState({
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
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCarpool({
      ...carpool,
      [name]: value,
    });
  };

  const handleSaveData = () => {
    const count = 1;
    const maxVal = parseInt(carpool.max);

    firebase
      .database()
      .ref(`carpoolList/${carpool.name}`)
      .once("value")
      .then((snapshot) => {
        Swal.fire({
          title: "Carpool이 등록되었습니다.",
          icon: "success",
        });
        if (snapshot.exists()) {
          const now = snapshot.val().now;
          const currentCount = snapshot.val().count;
          if (now < maxVal && currentCount < maxVal) {
            const newNow = now + count;
            const newCount = currentCount + count;
            if (newNow <= maxVal && newCount <= maxVal) {
              firebase.database().ref(`carpoolList/${carpool.name}`).update({
                max: maxVal,
                now: 1,
                count: 1,
              });
            }
          }
        } else {
          firebase.database().ref(`carpoolList/${carpool.name}`).update({
            max: maxVal,
            now: 1,
            count: 1,
          });
        }
      });
  };
  /*************** fireBase ***************/
  return (
    <>
      <Header />
      <Sidebar />
      <ContainerDiv>
        <div style={{ height: "150px" }}></div>
        <FormDiv>
          <h3>Carpool 글작성 하기</h3>
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
                    insertCarpool();
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
                      navigate("/carpool");
                    }
                  }}
                >
                  목록으로
                </Button>
              </div>
            </div>

            <input
              id="carpool_title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                marginLeft: "10px",
                width: "98%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              onChange={(e) => {
                handleTitle(e.target.value);
              }}
            />
            <br />
            <br />
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
            <br />
            <h3>날짜</h3>
            <input
              style={{ width: "98%", marginLeft: "10px" }}
              type="date"
              className="form-control"
              id="festStartday"
              name="startDay"
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <br />

            <h3 style={{ marginBottom: "20px" }}>Carpool 최대 인원</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <h5 style={{ marginLeft: "10px" }}>글번호</h5>
              <input
                style={{ width: "auto", marginLeft: "10px" }}
                className="form-control"
                type="text"
                id={boardCpNo}
                name="name"
                placeholder="글번호"
                // readOnly
                // value={boardCpNo}
                onChange={handleInputChange}
              />

              <h5 style={{ marginLeft: "50px" }}>최대 인원</h5>
              <input
                style={{ width: "auto", marginLeft: "10px" }}
                className="form-control"
                type="text"
                id="max"
                name="max"
                placeholder="최대인원"
                onChange={handleInputChange}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  width: "30%",
                  backgroundColor: "black",
                  marginTop: "10px",
                }}
                className="form-control"
                type="text"
                onClick={handleSaveData}
              >
                카풀 등록
              </Button>
            </div>

            <hr style={{ margin: "10px 0px 10px 0px" }} />

            <div>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridPlace">
                  <br />
                  <h3>접선 장소</h3>
                  <Form.Control
                    required
                    id="place"
                    type="text"
                    placeholder="접선 장소를 입력하세요."
                    style={{ width: "98%", height: "50px", marginLeft: "10px" }}
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
            </div>

            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <br />
            <br />
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
        </FormDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default CarpoolWriteForm;
