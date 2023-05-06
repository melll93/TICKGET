import axios from "axios";

//위시리스트 조회
export const wishlistSelectDB = (wData) => {
  console.log(wData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/wishlist/wishlistSelect",
        params: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//위시리스트 상세정보
export const wishlistDetailDB = (wData) => {
  console.log(wData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/wishlist/wishlistDetail",
        params: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//위시리스트 추가
export const wishlistAddDB = (wData) => {
  console.log(wData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/wishlist/wishlistAdd",
        data: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//위시리스트 전체 제거
export const wishlistDelDB = (wData) => {
  console.log(wData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/wishlist/wishlistDelete",
        params: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//위시리스트 선택 제거
export const wishlistSelDelDB = (wData) => {
  console.log(wData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/wishlist/wishlistSelDelete",
        params: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//위시리스트 판매여부 업데이트 (타 사용자 예외처리)
export const wishlistUpdateStatusDB = (wishlistSelled) => {
  console.log(wishlistSelled);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url:
          process.env.REACT_APP_BACKEND_URL + "/wishlist/wishlistUpdateStatus",
        params: wishlistSelled,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
