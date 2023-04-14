import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { getConcertListDB } from "../../axios/festival/main";
import BasicPagination from "../../components/BasicPagination";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  // JSON 파일을 배열 객체로 저장
  const [concerts, setConcerts] = useState([]);
  const [page, setPage] = useState("");
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
  });

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <ul className="items">
          <div className="container">
            {concerts.map((concert, index) => (
              <div key={index} className="item">
                <li style={{ listStyle: "none" }}>
                  <img src={concert.mainImg} style={{ objectFit: "cover" }} />
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
