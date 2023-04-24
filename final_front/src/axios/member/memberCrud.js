import axios from 'axios';

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/register/memberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: "http://localhost:8888/register/memberInsert",
        data: member, // POST방식으로 테스트 할 때는 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
// 전체 회원 정보 수정 update
export const memberUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member)
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: "http://localhost:8888/register/memberUpdate",
        data: member, 
      });
      resolve(response); // 요청 처리가 성공 시
    } catch (error) {
      reject(error); // 요청 처리 실패 시
    }
  });
};
// 비밀번호 update
export const changePwUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member)
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: "http://localhost:8888/register/changePwUpdate",
        data: member, 
      });
      resolve(response); // 요청 처리가 성공 시
    } catch (error) {
      reject(error); // 요청 처리 실패 시
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/register/memberDelete",
        params: member, // 쿼리스트링은 header에 담김(get 방식)
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}