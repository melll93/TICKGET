import axios from "axios";

/* 전체조회 */
export const selectCarpoolDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/carpool/selectCarpool",
        params: carpool, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 작성 */
export const insertCarpoolDB = (carpool) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/carpool/insertCarpool",
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
        url: "http://localhost:8888/carpool/carpoolDetail",
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
        url: "http://localhost:8888/carpool/deleteCarpool",
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
        url: "http://localhost:8888/carpool/updateCarpool",
        data: carpool,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
