import axios from "axios";

export const jsonboardListDB = (board) => {
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

export const deleteBoardListDB = (board) => {
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

export const boardInsertDB = (board) => {
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