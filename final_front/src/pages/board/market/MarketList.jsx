import React, { useEffect, useState } from "react";
import { mk_boardListDB } from "../../../axios/board/market/marketLogic";
import MarketRow from "./MarketRow";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CommonPagination from "../../../components/CommonPagination";

const MarketList = () => {
  //페이징 처리시에 현재 내가 바라보는 페이지 정보 담기
  let page = 1;
  //url 주소에 한글 있을 때 사용
  const search = decodeURIComponent(useLocation().search);
  console.log(search);
  const [boards, setBoards] = useState([]);


  
  //페이지네이션 처리
  const [pages, setPage] = useState(1);
  const [perPage] = useState(10);
  
  useEffect(() => {
    selectBoardList();
  }, []);

  const indexOfLastPost = pages * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentMkBoard = (boards) => {
    let currentFest = 0;
    currentFest = boards.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  
  const selectBoardList = async () => {
    const res = await mk_boardListDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoards(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };




  useEffect(() => {
    const boardList = async () => {
      //콤보박스 내용 -> 제목, 내용, 작성자 중 하나
      //사용자가 입력한 키워드
      //http://localhost:3000/market/condition=제목|장소|작성자&content=입력한값
      //[0] - condition=제목|장소|작성자
      //[1] - content=입력값
      const condition = search
        .split("&")
        .filter((item) => {
          return item.match("condition");
        })[0]
        ?.split("=")[1];
      console.log(condition);
      const content = search
        .split("&")
        .filter((item) => {
          return item.match("content");
        })[0]
        ?.split("=")[1];
      console.log(content);

      const board = {
        //get방식 조건검색 - param속성에 들어갈 변수
        page: page,
        condition: condition,
        content: content,
      };
      const res = await mk_boardListDB(board);
      console.log(res.data);
      setBoards(res.data);
    };
    boardList();
  }, [setBoards, page, search]);

  return (
    <>
      {currentMkBoard(boards).map((boards) => (
        <MarketRow key={boards.boardMkNo} boards={boards} />
      ))}
 
 <CommonPagination 
          pagination={setPage}
          perPage={perPage}
          totalItems={boards.length}
        ></CommonPagination>
    </>
  );
};

export default MarketList;
