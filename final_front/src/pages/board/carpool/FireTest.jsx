import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/database";
import React, { useEffect, useState } from "react";

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

const FireTest = () => {
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
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setRealTime({
      ...realTime,
      [name]: value,
    });
  };

  const handleSaveData = () => {
    const count = 1;
    const maxVal = parseInt(realTime.max);
    firebase
      .database()
      .ref(realTime.name)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const now = snapshot.val().now;
          const currentCount = snapshot.val().count;
          if (now < maxVal && currentCount < maxVal) {
            const newNow = now + count;
            const newCount = currentCount + count;
            if (newNow <= maxVal && newCount <= maxVal) {
              firebase
                .database()
                .ref(realTime.name)
                .update({
                  max: maxVal,
                  now: firebase.database.ServerValue.increment(count),
                  count: firebase.database.ServerValue.increment(count),
                });
              console.log("저장 성공");
            } else {
              console.log("인원이 다 찼습니다.");
            }
          } else {
            console.log("인원이 다 찼습니다.");
          }
        } else {
          firebase.database().ref(realTime.name).set({
            max: maxVal,
            now: 1,
            count: 1,
          });
          console.log("저장 성공");
        }
      });
  };

  return (
    <div>
      <h1>Firebase EXAMPLE</h1>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="글번호"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <input
        type="text"
        id="max"
        name="max"
        placeholder="최대인원"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <input
        type="text"
        id="now"
        name="now"
        placeholder="현재인원"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <button onClick={handleSaveData}>카풀참가</button>
      {Object.keys(data)
        .filter((key) => key === "carpoolList")
        .map((key) => {
          const carpoolList = data[key];
          return Object.keys(carpoolList).map((boardCpNo) => {
            const item = carpoolList[boardCpNo];
            return (
              <div className="data" key={boardCpNo}>
                글번호={boardCpNo} : 최대 인원={item.max}, save누르면 증가=
                {item.count}
              </div>
            );
          });
        })}
    </div>
  );
};

export default FireTest;
