import axios from "axios";

/*********************
 * params None; DB에서 CURDATE()로 처리
 * return Array[]
 *********************/
export const getFestivalTodayDB = async () => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888/api/concertToday",
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
    url: "http://localhost:8888/api/concertList",
    // process.env.BACKEND_URL + "api/concertToday"
    params: { category: category },
  }).then((res) => res.data);
  // console.log(result);
  return result;
};

export const getMovieListDB = async () => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888/api/movieList",
  }).then((res) => res.data);

  return result;
};
