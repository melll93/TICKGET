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


  export const FetivalListDB =async(festival) => {
    const result = await axios({
          method: "get",
          url: "http://localhost:8888/festival/festivalList",
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


  
  export const FestivalReviewDB = (freview) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: "http://localhost:8888/review/reviewList",
          params: freview, 
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const FestReviewInsertDB = (freview) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method:"post", 
          url: "http://localhost:8888/review/reviewInsert",
          data:freview, 
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };