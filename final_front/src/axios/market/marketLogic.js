import axios from "axios";

//마켓 게시판 게시글 조회 로직
export const mk_boardListDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글쓰기 등록 로직
export const mk_boardInsertDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/mk_boardInsert",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글 수정 로직
export const mk_boardUpdateDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/mk_boardUpdate",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글 삭제 로직
export const mk_boardDeleteDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardDelete",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 이미지 구현
export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/imageUpload",
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

//첨부파일 로직
export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/fileUpload",
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
