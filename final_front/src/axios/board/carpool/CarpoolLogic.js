import axios from "axios";

/* 전체조회 */
export const selectCarpoolDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/selectCarpool",

        // "http://localhost:8888/carpool/selectCarpool",
        params: carpool, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 글번호 +1 */
export const getBoardCpNoDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/getBoardCpNo",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 작성 */
export const insertCarpoolDB = (carpool) => {
  console.log("여기보아라~~~~~~~~~", carpool);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/insertCarpool",
        params: carpool,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 상세보기 */
export const CarpoolDetailDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/carpoolDetail",
        params: carpool, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 삭제 */
export const deleteCarpoolDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/deleteCarpool",
        params: carpool,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 수정 */
export const updateCarpoolDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/updateCarpool",
        data: carpool,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 조회수 */
export const carpoolViewUpDB = async (boardCpNo) => {
  /* 오케이 여기까진 진출했어 */
  console.log("viewUpDB boardCpNo ", boardCpNo);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/carpool/carpoolViewUp",
        params: { boardCpNo: boardCpNo },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
