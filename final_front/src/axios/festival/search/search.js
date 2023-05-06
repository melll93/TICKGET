import { async } from "@firebase/util";
import axios from "axios";

export const searchFetivalListDB = async (keyword) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/search/searchFestivals?keyword=${keyword}`,
  }).then((res) => res.data);
  return result;
};

export const searchCarpoolListDB = async (keyword) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/search/searchCarpool?keyword=${keyword}`,
  }).then((res) => res.data);
  return result;
};

export const searchMarketListDB = async (keyword) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/search/searchMarket?keyword=${keyword}`,
  }).then((res) => res.data);
  return result;
};

export const searchForMypageDB = async (memid) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/search/searchForMypage?memid=${memid}`,
  }).then((res) => res.data);
  return result;
};
