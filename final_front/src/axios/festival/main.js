import axios from "axios";

/*********************
 * params None; DB에서 CURDATE()로 처리
 * return Array[]
 *********************/
export const getFestivalTodayDB = async () => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/api/concertToday",
    // process.env.BACKEND_URL + "api/concertToday"
  }).then((res) => res.data);
  // console.log(result);
  return result;
};

/*********************
 * params Category("콘서트","축제" 등)
 * return Array[]
 *********************/
export const getConcertListDB = async (category) => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/api/concertList",
    // process.env.BACKEND_URL + "api/concertToday"
    params: { category: category },
  }).then((res) => res.data);
  // console.log(result);
  return result;
};

/***********************
 * 오픈 예정 행사 가져오기
 *
 ***********************/
export const getOpenSoonListDB = async () => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/api/openSoonList",
  }).then((res) => res.data);
  return result;
};

export const getMovieListDB = async () => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/api/movieList",
  }).then((res) => res.data);

  return result;
};
