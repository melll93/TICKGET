import React, { useEffect, useState } from "react";
import { mk_boardListDB } from "../../../axios/board/market/marketLogic";
import MarketRow from "./MarketRow";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MarketList = () => {
  //페이징 처리시에 현재 내가 바라보는 페이지 정보 담기
  let page = 1;
  //url 주소에 한글 있을 때 사용
  const search = decodeURIComponent(useLocation().search);
  console.log(search);
  const [boards, setBoards] = useState([]);

  // mk_boardListDB의 return은 Promise이므로 then으로 다시 데이터를 처리해줘야함.
  /*   useEffect(() => {
    mk_boardListDB().then((res) => {
      setBoards(res.data); // 응답 Promise로부터 data를 꺼내 boards에 세팅.
    });
  }, []); */

  /*   useEffect(()=> {
    mk_boardListDB().then(setBoards);
  },[])
 */

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
      {boards.map((boards) => (
        <MarketRow key={boards.boardMkNo} boards={boards} />
      ))}
    </>
  );
};

export default MarketList;
