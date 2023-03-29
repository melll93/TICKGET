import axios from "axios";

export const FestivalInsertDB = (festival) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method:"post", 
          url: "http://localhost:8888/festival/festivalInsert",
          data:festival, 
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };


  export const FetivalListDB = (festival) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: "http://localhost:8888/festival/festivalList",
          params: festival, 
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
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