import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  carpoolViewUpDB,
  selectCarpoolDB,
} from "../../../axios/board/carpool/CarpoolLogic";
import CommonPagination from "../../../components/CommonPagination";
import React, { useEffect, useState } from "react";
import "firebase/database";
import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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



const CarpoolBoardList = () => {
  console.log("CarpoolBoardList");
  const navigate = useNavigate();
  const [carpoolList, setCarpoolList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(15);

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
    firebase
      .database()
      .ref(carpool.name)
      .update({
        max: carpool.max,
        now: carpool.now,
        count: firebase.database.ServerValue.increment(count),
      });
    console.log("저장 성공");
  };



  useEffect(() => {
    selectCarpoolList();
  }, []);

  /********** 페이지 네이션 처리 **********/
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (boardList) => {
    let currentFest = 0;
    currentFest = boardList.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };
  /********** 페이지 네이션 처리 **********/

  // 전체 게시글 조회
  const selectCarpoolList = async () => {
    const res = await selectCarpoolDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setCarpoolList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };

  //조회수 증가
  const updateViews = async (boardCpNo) => {
    console.log("boardCpNo넌 누구야? " + boardCpNo);
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
          style={{ width: "1500px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="row" style={{ marginTop: "40px" }}>
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>번호</th>
                  <th width="15%">제목</th>
                  <th style={{ textAlign: "center" }}>작성자</th>
                  <th style={{ textAlign: "center" }}>카풀 인원</th>
                  <th style={{ textAlign: "center" }}>작성일</th>
                  <th style={{ textAlign: "center" }}>조회수</th>
                </tr>
              </thead>
              <tbody>
                {currentFest(carpoolList).map((carpool) => (
                  <tr key={carpool.boardCpNo}>
                    <td style={{ textAlign: "center", width: "100px" }}>
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
                    <td style={{ textAlign: "center", width: "200px" }}>
                      {carpool.boardCpMemId}
                    </td>
                    <td style={{ textAlign: "center", width: "100px" }}>
                      수정중
                    </td>
                    <td style={{ textAlign: "center", width: "200px" }}>
                      {carpool.boardCpDate}
                    </td>
                    <td style={{ textAlign: "center", width: "100px" }}>
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
        >
          <Button
            variant="warning"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={selectCarpoolList}
          >
            전체조회
          </Button>
          &nbsp;
          <Button
            variant="success"
            style={{ backgroundColor: "black" }}
            onClick={() => navigate("/carpool/write")}
          >
            글 작성하기
          </Button>
          &nbsp;
        </div>
      </div>
       <div>
      <h1>Firebase EXAMPLE</h1>
      <input type="text" id="name" name="name" placeholder="글번호"
        onChange={handleInputChange}/>
      <br />
      <input type="text" id="max" name="max" placeholder="최대인원"
        onChange={handleInputChange}/>
      <br />
      <input type="text" id="now" name="now" placeholder="현재인원"
        onChange={handleInputChange}/>
      <br />
      <button onClick={handleSaveData}>Save Data</button>
      {Object.keys(data).map((key) => {
        const item = data[key];
        return (
          <div className="data" key={key}>
            글번호={key} : 최대 인원={item.max}, 현재 인원={item.now}, save누르면 증가={item.count}
          </div>
        );
      })}
    </div>
    </>
  );
};

export default CarpoolBoardList;
