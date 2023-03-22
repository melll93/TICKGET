import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  // JSON 파일을 배열 객체로 저장
  const [concerts, setConcerts] = useState([]);

  const getJsonData = async () => {
    await axios("assets/data/seoul_data.json").then((res) => {
      const dataArray = res.data.DATA
      let temp = [];
      for (let i = 0; i < 20; i++) {
        temp.push(dataArray[i])
      }
      setConcerts(temp)
      return temp;
    })
  }
  console.log(concerts);

  useEffect(() => {
    getJsonData();
  }, [])

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        {concerts.map((concert, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <div>
              <img src={concert.main_img} /></div>
            <div>
              {concert.title}<br />
              {concert.date}</div>
          </li>
        ))}
      </div>
    </>
  );
};

export default ConcertPage;
