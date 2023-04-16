import axios from "axios";

// 결제내역 조회
export const paymentList = (pData) => {
  console.log(pData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/payment/paymentList",
        params: pData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 결제내역 상세정보
export const paymentDetail = (pData) => {
  console.log(pData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/payment/paymentDetail",
        params: pData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 결제 정보 입력
export const paymentInsert = (pData) => {
  console.log(pData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/payment/paymentInsert",
        data: pData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 결제 정보 삭제(환불)
export const paymentDelete = (pData) => {
  console.log(pData);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/payment/paymentDelete",
        params: pData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
