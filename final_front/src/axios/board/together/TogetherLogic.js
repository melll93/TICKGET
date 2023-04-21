import axios from "axios";

/* 전체조회 */
// export const selectBoardListDB = (board) => {
export const selectTogetherDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/board/selectBoardList",
        params: board, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 상세보기 */
// export const selectBoardDetailDB = (board) => {
export const selectTogetherDetailDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/board/selectBoardDetail",
        params: board, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 삭제 */
// export const deleteBoardListDB = (board) => {
export const deleteTogetherDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/board/deleteBoardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 작성 */
// export const insertBoardListDB = (board_together) => {
export const insertTogetherDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/board/insertBoardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 수정 */
// export const updateBoardListDB = (board) => {
export const updateTogetherDB = (board) => {
  console.log("board?? ?SD S, ", board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/board/updateBoardList",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 조회수 */
export const togetherViewUpDB = async (boardTgNo) => {
  /* 오케이 여기까진 진출했어 */
  console.log("viewUpDB boardTgNo ", boardTgNo);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/board/togetherViewUp",
        params: { boardTgNo: boardTgNo },
      });
      console.log("@@@@@@@@@@@@@@", boardTgNo);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
