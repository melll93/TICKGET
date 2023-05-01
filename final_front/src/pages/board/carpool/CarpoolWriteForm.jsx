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
import MapContainer from "../market/Map/MapContainer";
import { firebaseConfig } from "./CarpoolBoardList";

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

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const min = `${year}-${month}-${day}`;

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

    if (!place) {
      Swal.fire({
        title: "장소을 입력해주세요",
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
      boardCpDate: min,
      boardCpNo: boardCpNo,
      boardCpPlace: place,
    };
    try {
      const res = await insertCarpoolDB(carpool);
      // handleSaveData();
      Swal.fire({
        title: "게시글이 작성 완료되었습니다.",
        icon: "success",
      });
      window.location.replace("/carpool");
    } catch (error) {
      console.log(error);
    }
  };

  /*************** fireBase ***************/
  const [data, setData] = useState({});
  const [realTime, setRealTime] = useState({
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
    setRealTime({
      ...realTime,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSaveData = () => {
    const count = 1;
    const maxVal = parseInt(realTime.max);

    firebase
      .database()
      .ref(`carpoolList/${boardCpNo}`)
      .once("value")
      .then((snapshot) => {
        Swal.fire({
          title: "카풀을 등록했습니다.",
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
              id="carpool_title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                margin: "10px 0px 0px 10px",
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
                navigate("/login");
                return null;
              }
            })()}

            <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

            <br />
            <h3>날짜</h3>
            <input
              style={{ width: "390px", marginLeft: "10px" }}
              className="form-control"
              id="festStartday"
              name="startDay"
              // type="datetime-local"
              value={min}
              onChange={(e) => {
                handleDate(e.target.value);
              }}
            />

            <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />
            <br />

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
                카풀 등록
              </Button>
            </div>

            <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

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

            <hr style={{ width: "98%", margin: "10px 0px 10px 0px" }} />

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
                </Form.Group>
              </Row>
            </div>
            <span
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              ∙ 만남의 장소 : {place}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MapContainer place={place} />
            </div>
          </div>
        </FormDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default CarpoolWriteForm;
