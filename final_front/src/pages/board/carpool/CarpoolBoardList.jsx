import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/database";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  carpoolViewUpDB,
  selectCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import CommonPagination from "../../../components/CommonPagination";

/************* firebase Config  ************
 * 은영 - festivalDetail 에서 주워다 쓰는중 export 지우거나 하면 알려주삼
 */
export const firebaseConfig = {
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

/************* firebase Config *************/

const CarpoolBoardList = () => {
  const navigate = useNavigate();
  const [carpoolList, setCarpoolList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  /************* firebase 처리 중 *************/
  const [data, setData] = useState({});

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    database.ref().on("value", (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    return () => {
      database.ref().off();
    };
  }, []);

  const handleSaveData = (boardCpNo) => {
    const count = 1;
    const cookies = new Cookies();
    const _userData = cookies.get("_userData"); //유저 정보
    console.log("_userData : ", _userData);

    if (!_userData) {
      Swal.fire({
        title: "로그인을 해주세요.",
        icon: "error",
      });
      window.location.href = "/login";
      return;
    }

    firebase
      .database()
      .ref(`carpoolList/${boardCpNo}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const maxVal = snapshot.val().max;
          const now = snapshot.val().now;
          const currentCount = snapshot.val().count;
          if (now < maxVal && currentCount < maxVal) {
            const newNow = now + count;
            const newCount = currentCount + count;
            if (newNow <= maxVal && newCount <= maxVal) {
              firebase
                .database()
                .ref(`carpoolList/${boardCpNo}`)
                .update({
                  now: firebase.database.ServerValue.increment(count),
                  count: firebase.database.ServerValue.increment(count),
                  memberId: _userData.memberId,
                });
            }
            Swal.fire({
              title: "신청이 완료 되었습니다.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "인원이 다 찼습니다.",
              icon: "warning",
            });
          }
        } else {
          firebase.database().ref(`carpoolList/${boardCpNo}`).set({
            max: 10,
            now: 1,
            count: 1,
          });
        }
      });
  };
  /************* firebase 처리 중 *************/

  useEffect(() => {
    selectCarpoolList();
  }, []);

  /********** 페이지 네이션 처리 시작 **********/
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (boardList) => {
    let currentFest = 0;
    currentFest = boardList.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };
  /********** 페이지 네이션 처리 종료 **********/

  // 전체 게시글 조회
  const selectCarpoolList = async () => {
    const res = await selectCarpoolDB();
    if (res.data && Array.isArray(res.data)) {
      setCarpoolList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  //조회수 증가
  const updateViews = async (boardCpNo) => {
    await carpoolViewUpDB(boardCpNo);
    await selectCarpoolList();
  };

  if (carpoolList === null) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <div>
        <div
          style={{ width: "1200px", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="success"
            style={{
              backgroundColor: "black",
              marginLeft: "auto",
              marginRight: "0px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => navigate("/carpool/write")}
          >
            글 작성하기
          </Button>
          <br />
          <div className="row" style={{ marginTop: "0px" }}>
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>번호</th>
                  <th>제목</th>
                  <th style={{ textAlign: "center" }}>작성자</th>
                  <th style={{ textAlign: "center" }}>카풀 현황</th>
                  <th style={{ textAlign: "center" }}></th>
                  <th style={{ textAlign: "center" }}>작성일</th>
                  <th style={{ textAlign: "center" }}>조회수</th>
                </tr>
              </thead>

              <tbody>
                {currentFest(carpoolList).map((carpool) => (
                  <tr key={carpool.boardCpNo}>
                    <td style={{ textAlign: "center", width: "50px" }}>
                      {carpool.boardCpNo}
                    </td>
                    <td style={{ width: "300px" }}>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          updateViews(carpool.boardCpNo);
                          navigate({
                            pathname:
                              "/carpool/carpoolDetail/" + carpool.boardCpNo,
                            state: { carpool },
                          });
                        }}
                      >
                        {carpool.boardCpTitle}
                      </button>
                    </td>
                    <td style={{ textAlign: "center", width: "100px" }}>
                      {carpool.boardCpMemId}
                    </td>

                    {/* 파이어 베이스에서 받아온 값 호출하자 시작*/}
                    <td style={{ textAlign: "center", width: "200px" }}>
                      {data.carpoolList &&
                        Object.keys(data.carpoolList).map((key) => {
                          if (Number(key) === carpool.boardCpNo) {
                            const item = {
                              boardCpNo: key,
                              ...data.carpoolList[key],
                            };
                            return (
                              <div className="data" key={carpool.boardCpNo}>
                                최대인원 = {item.max}, 참가인원 = {item.count}/
                                {item.max}
                                <br />
                              </div>
                            );
                          }
                          return null;
                        })}
                    </td>
                    {/* 파이어 베이스에서 받아온 값 호출하자종료  */}

                    <td style={{ textAlign: "center", width: "80px" }}>
                      <Button
                        style={{
                          height: "20px",
                          width: "65px",
                          fontSize: "10px",
                          backgroundColor: "black",
                        }}
                        onClick={() => handleSaveData(carpool.boardCpNo)}
                      >
                        함께하기
                      </Button>
                    </td>
                    <td style={{ textAlign: "center", width: "100px" }}>
                      {carpool.boardCpDate}
                    </td>
                    <td style={{ textAlign: "center", width: "50px" }}>
                      {carpool.boardCpViews}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <CommonPagination
              pagination={setPage}
              perPage={perPage}
              totalItems={carpoolList.length}
            ></CommonPagination>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      </div>
    </>
  );
};

export default CarpoolBoardList;
