import axios from "axios";

/* 전체조회 */
export const selectCarpoolReplyDB = (boardReply) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/carpool/selectCarpoolReplyList",
        params: boardReply, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 등록하기 */
export const insertCarpoolReplyDB = (boardReply) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/carpool/insertCarpoolReply",
        params: boardReply,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
