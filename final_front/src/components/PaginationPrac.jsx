import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import '../styles/pagination.css'; 

// import { Pagination } from '@mui/material'

const PaginationPrac= ({currentFest, pagination, perPage, totalFest}
 ) => {
const pageNum=[];

const endPage=Math.ceil(totalFest/perPage)
console.log(endPage)

for(let i = 1; i<=endPage; i++){
    pageNum.push(i);
}


const [currentPage, setCurrentPage] = useState(1);

const handleClick = (page) => { setCurrentPage(page);  pagination(page);};

const handlePrevClick = () => { if (currentPage > 1) { setCurrentPage(currentPage - 10); pagination(currentPage - 10); }};

const handleNextClick = () => {  if (currentPage < endPage) { setCurrentPage(currentPage + 10);  pagination(currentPage + 10);}};

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

export default PaginationPrac


