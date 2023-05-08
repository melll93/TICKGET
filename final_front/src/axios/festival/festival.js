import { async } from "@firebase/util";
import axios from "axios";

/* 메인페이지 캐로쉘 상품*/
export const festivalListByDate = async (date) => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalListByDate",
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
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalHitList",
    params: { festMHit },
  }).then((res) => res.data);
  return result;
};

/* 페스티발 페이지*/
export const FestivalInsertDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalInsert",
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
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalList",
    params: festival,
  }).then((res) => res.data);
  return result;
};

export const getLatestFestivalDB = async () => {
  const res = await axios.get(
    process.env.REACT_APP_BACKEND_URL + "/festival/latestFestivalList"
  );
  return res.data;
};

export const DeleteFestivalDB = async (festival) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalDelete",
    params: festival,
  }).then((res) => res.data);
  return result;
};

/* 조회수 */
export const thumbsupFestivalDB = async (festMId) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalThumpsUp",
    params: { festMId },
  }).then((res) => res.data);
  return result;
};

/* 지역별 */
export const areaFestivalListDB = async (festMArea) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/festival/areaFestivalList?fest_m_area=${festMArea}`,
    params: { festMArea },
  }).then((res) => res.data);
  return result;
};

/* 
페스티발 상세페이지 하단 - 리뷰
*/
export const DeleteFestReviewDB = async (freview) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/review/reviewDelete",
    params: freview,
  }).then((res) => res.data);
  return result;
};

export const FestivalReviewDB = async (freview) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/review/reviewList",
    params: freview,
  }).then((res) => res.data);
  return result;
};

export const FestReviewInsertDB = (freview) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/review/reviewInsert",
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
    url: process.env.REACT_APP_BACKEND_URL + "/review/reviewUpdate",
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
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalDetail",
    params: festival,
  }).then((res) => res.data);
  return result;
};

export const FetivalDetailDB = (festMId) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalDetail",
        params: festMId,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* fest_detail 추가 */
export const saveFestDetailDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festDetailInsert",
        data: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* fest_poster 추가 */
export const saveFestPsUrlDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festPosterInsert",
        data: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* fest_poster삭제 */
export const deleteFestPosterDB = async (fest_ps_no) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalPosterDelete",
    params: fest_ps_no,
  }).then((res) => res.data);
  return result;
};

/* fest_Ticket삭제 */
export const deleteFestTicketDB = async (fest_tc_no) => {
  const result = await axios({
    method: "get",
    url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalTicketDelete",
    params: fest_tc_no,
  }).then((res) => res.data);
  return result;
};

/* fest_ticekt 추가 */
export const festTicketInsertDB = (tickets) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festTicketInsert",
        data: tickets,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 수정 */
export const festivalUpdateDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "/festival/festivalUpdate",
        data: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 수정 */
export const festivalDetailUpdateDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url:
          process.env.REACT_APP_BACKEND_URL + "/festival/festivalDetailUpdate",
        data: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
