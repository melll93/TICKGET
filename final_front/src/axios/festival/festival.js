import { async } from "@firebase/util";
import axios from "axios";

/* 메인페이지 캐로쉘 상품*/
export const festivalListByDate = async (date) => {
  const result = await axios({
    method: "GET",
    url:
      // process.env.BACKEND_URL
      "http://localhost:8888/" + "festival/festivalListByDate",
    params: {
      date: date,
    },
  }).then((res) => res.data);
  return result;
};

/* 메인페이지 what's hot 상품 */
export const festivalHitListDB = async (festMHit) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/festival/festivalHitList",
    params: {festMHit},
  }).then((res) => res.data);
  return result;
};


/* 페스티발 페이지*/
export const FestivalInsertDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/festival/festivalInsert",
        data: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const FetivalListDB = async (festival) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/festival/festivalList",
    params: festival,
  }).then((res) => res.data);
  return result;
};


export const DeleteFestivalDB = async (festival) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/festival/festivalDelete",
    params: festival,
  }).then((res) => res.data);
  return result;
};


/* 지역별 */
export const areaFestivalListDB = async(festMArea) => {
  const result = await axios({
    method: "get",
    url: `http://localhost:8888/festival/areaFestivalList?fest_m_area=${festMArea}`,
    params: {festMArea},
  }).then((res) => res.data);
  return result;
};



/* 
페스티발 상세페이지 하단 - 리뷰
*/
export const DeleteFestReviewDB = async (freview) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/review/reviewDelete",
    params: freview,
  }).then((res) => res.data);
  return result;
};


export const FestivalReviewDB = async (freview) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/review/reviewList",
    params: freview,
  }).then((res) => res.data);
  return result;
};

export const FestReviewInsertDB = (freview) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/review/reviewInsert",
        data: freview,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const UpdateFestReviewDB = async (freview) => {
  const result = await axios({
    method: "post",
    url: "http://localhost:8888/review/reviewUpdate",
    data: freview,
  }).then((res) => res.data);
  return result;
};



/* 
페스티발 상세페이지 
*/
export const FetivalDetailDB2 = async (festival) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/festival/festivalDetail",
    params: festival,
  }).then((res) => res.data);
  return result;
};

export const FetivalDetailDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/festival/festivalDetail",
        params: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
