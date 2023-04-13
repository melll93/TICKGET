import { async } from "@firebase/util";
import axios from "axios";

export const festivalToday = (date) => {

}

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

export const DeleteFestReviewDB = async (freview) => {
  const result = await axios({
    method: "get",
    url: "http://localhost:8888/review/reviewDelete",
    params: freview,
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

export const SeoulFestivalListDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/festival/seoulFestivalList",
        params: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const KyeongkiFestivalListDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/festival/kyeongkiFestivalList",
        params: festival,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
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
