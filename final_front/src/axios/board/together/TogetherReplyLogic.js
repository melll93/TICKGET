import axios from "axios";

/* 전체조회 */
export const selectTogetherReplyDB = (boardReply) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url:
          process.env.REACT_APP_BACKEND_URL + "/board/selectTogetherReplyList",
        params: boardReply, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 등록하기 */
export const insertTogetherReplyDB = (boardReply) => {
  console.log("insertTogetherReplyDB ", boardReply);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/board/insertTogetherReply",
        params: boardReply,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 삭제 */
export const deleteTogetherReplyDB = (boardReply) => {
  console.log("deleteTogetherReplyDB의 boardReply = ", boardReply);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/board/deleteTogetherReply",
        data: boardReply,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 수정 */
export const updateTogetherReplyDB = (boardReply) => {
  console.log("updateTogetherReplyDB boardReply = ", boardReply);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/board/updateTogetherReply",
        data: boardReply,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
