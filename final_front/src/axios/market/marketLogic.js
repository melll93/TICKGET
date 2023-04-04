import axios from "axios";

//마켓 게시판 게시글 조회 로직
export const mk_boardListDB = async () => {
  const result = await axios({
    method : "GET",
    url : "http://localhost:8888/market/mk_boardList",

  }).then((res) => res.data);
  console.log(result);
  return result;
}
/* export const mk_boardListDB = (board) => {
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
}; */


//마켓 게시판 글쓰기 등록 로직
export const mk_boardInsertDB = async () => {
  const result = await axios({
    method: "POST",
    url: "http://localhost:8888/market/mk_boardInsert",

  }).then((res) => res.data);
  console.log(result);
  return result;
}

//마켓 게시판 글 수정 로직
export const mk_boardUpdateDB = async () => {
  const result = await axios({
    method:"POST",
    url: "http://localhost:8888/market/mk_boardUpdate",
  
  }).then((res) => res.data);
  console.log(result);
  return result;
}

//마켓 게시판 글 삭제 로직
export const mk_boardDeleteDB = async () => {
  const result = await axios({
    method:"GET",
    url: "http://localhost:8888/market/mk_boardDelete",
  
  }).then((res) => res.data);
  console.log(result);
  return result;
}

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
