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
        url: "http://localhost:8888/wishlist/wishlistDetail",
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
        url: "http://localhost:8888/wishlist/wishlistAdd",
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
        url: "http://localhost:8888/wishlist/wishlistDelete",
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
        url: "http://localhost:8888/wishlist/wishlistSelDelete",
        params: wData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
