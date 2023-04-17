import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import "../styles/pagination.css";

/* 
쓸 곳에서 프롭스 options로 넘기기
  const [festivals, setFestivals] = useState([]); //짜를 아이템
  const [page, setPage] = useState(1);   
  const [perPage] = useState(20);  // 보여주고 싶은 갯수


  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (festivals) => {
    let currentFest = 0;
    currentFest = festivals.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  맵돌릴때 currentFest(boardList).map 으로 돌리기


<Pagination pagination={setPage} perPage={perPage} totalItems={festivals.length}/>
위처럼 넘기면 됨.
*/

const CommonPagination = ({ pagination, perPage, totalItems }) => {
  const pageNum = [];

  const endPage = Math.ceil(totalItems / perPage);
  console.log(endPage);

  for (let i = 1; i <= endPage; i++) {
    pageNum.push(i);
  }

  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    pagination(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 10);
      pagination(currentPage - 10);
    }
  };

  const handleNextClick = () => {
    if (currentPage < endPage) {
      setCurrentPage(currentPage + 10);
      pagination(currentPage + 10);
    }
  };

  const startpppage = (Math.ceil(currentPage / 10) - 1) * 10;
  const endpppage = Math.min(startpppage + 10, endPage);

  return (
    <div>
      <nav>
        <ul className="pagination">
          {startpppage > 0 && (
            <li>
              <a onClick={handlePrevClick}>&laquo;</a>
            </li>
          )}
          {pageNum.slice(startpppage, endpppage).map((num) => (
            <li key={num}>
              <a
                style={{
                  borderRadius: "50%",
                  backgroundColor: num === currentPage ? "black" : "white",
                  color: num === currentPage ? "white" : "black",
                }}
                onClick={() => handleClick(num)}
              >
                {num}{" "}
              </a>
            </li>
          ))}
          {endpppage < endPage && (
            <li>
              <a onClick={handleNextClick}>&raquo;</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default CommonPagination;
