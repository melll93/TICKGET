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
  })
};

export const insertBoardListDB = (board) => {
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


export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/board/fileUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/board/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(board)
      //axios - 비동기 요청 처리 ajax - fetch(브라우저) - axios(NodeJS - oracle서버연동)
      const response = axios({  //3000번 서버에서 8000서버로 요청을 함 - 네트워크(다른서버 - cors이슈)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaList",
        params: board, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaInsertDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaInsert",
        data: board, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};