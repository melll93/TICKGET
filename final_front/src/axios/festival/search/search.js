import { async } from "@firebase/util";
import axios from "axios";



export const searchFetivalListDB = async (keyword) => {
  const result = await axios({
    method: "get",
    url: `http://localhost:8888/search/searchFestivals?keyword=${keyword}`,
  }).then((res) => res.data);
  return result;
};

