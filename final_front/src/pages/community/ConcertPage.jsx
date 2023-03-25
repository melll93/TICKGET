import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { getConcertListDB } from "../../axios/main/main";
import BasicPagination from "../../components/BasicPagination";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  // JSON 파일을 배열 객체로 저장
  const [concerts, setConcerts] = useState([]);
  const [page, setPage] = useState("");
  const AMOUNT = 20;
  useEffect(() => {
    getConcertListDB("콘서트").then(setConcerts);
  }, []);

  // console.log(concerts);
  const pagination = (param) => {
    const _page = param;
    setPage(_page);
  };

  useEffect(() => {
    pagination();
    if (page) {
    }
    console.log(page);
  });

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <ul className="items">
          <div className="container">
            {concerts.map((concert, index) => (
              <div key={index} className="item">
                <li style={{ listStyle: "none" }}>
                  <img src={concert.main_img} style={{ objectFit: "cover" }} />
                  {concert.title}
                  <br />
                  <span>{concert.date}</span>
                </li>
              </div>
            ))}
          </div>
        </ul>
        <div style={{ textAlign: "center" }}>
          <BasicPagination pagination={pagination} />
        </div>
      </div>
    </>
  );
};

export default ConcertPage;
