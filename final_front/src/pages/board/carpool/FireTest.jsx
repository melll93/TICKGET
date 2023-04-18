import React, { useEffect, useState } from "react";
import "firebase/database";
import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBClSBAlT_Fqivgorxdgpk5XFcjvZT9oc",
  authDomain: "finalproject-85e01.firebaseapp.com",
  databaseURL: "https://finalproject-85e01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalproject-85e01",
  storageBucket: "finalproject-85e01.appspot.com",
  messagingSenderId: "333525904008",
  appId: "1:333525904008:web:4fdca275def5a243384d3d",
  measurementId: "G-H1V3SZRG53"

};

function FireTest() {
  const [data, setData] = useState({});
  const [carpool, setCarpool] = useState({
    boardCpNo: "",
    max: "",
    now: "",
  });

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

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setCarpool({
      ...carpool,
      [name]: value,
    });
  }

  function handleSaveData() {
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
  }

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
      <br/>
      <input
        type="text"
        id="max"
        name="max"
        placeholder="최대인원"
        onChange={handleInputChange}
      />
      <br/>
      <input
        type="text"
        id="now"
        name="now"
        placeholder="현재인원"
        onChange={handleInputChange}
      />
      <br/>
      <br />
      <button onClick={handleSaveData}>Save Data</button>
      <br />
      <br />
      {Object.keys(data).map((key) => {
        const item = data[key];
        return (
          <div className="data" key={key}>
            글번호={key} : 최대 인원={item.max}, 현재 인원={item.now},
            save누르면 증가={item.count}
          </div>
        );
      })}
    </div>
  );
}

export default FireTest;
