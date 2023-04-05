import React, { useEffect, useState } from "react";
import { mk_boardListDB } from "../../axios/market/marketLogic";
import MarketRow from "./MarketRow";

const MarketList = () => {
/*   const [board, setBoard] = useState([
    {
      cb_gubun: "qna_title",
      keyword: "PT10회권양도합니다.",
    },
  ]); */

  const [boards, setBoards] = useState([]);

  // mk_boardListDB의 return은 Promise이므로 then으로 다시 데이터를 처리해줘야함.
/*   useEffect(() => {
    mk_boardListDB().then((res) => {
      setBoards(res.data); // 응답 Promise로부터 data를 꺼내 boards에 세팅.
    });
  }, []); */

  
  useEffect(()=> {
    mk_boardListDB().then(setBoards);
  },[])


 /*  useEffect(() => {
    const boardList = async () => {
      //비동기 처리로 요청
      const res = await mk_boardListDB(); // async가 있을 때 await사용 가능함
      console.log(res.data);
      setBoards(res.data);
    };
    boardList();
  }, []); 
  */ 

  

  return (
    <>
      {boards.map((boards) => (
        <MarketRow key={boards.boardMkNo} boards={boards} />
      ))}
    </>
  );
};

export default MarketList;
