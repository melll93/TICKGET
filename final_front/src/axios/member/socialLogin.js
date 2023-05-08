import axios from "axios";

export const sendNaverMember = async (member) => {
  const result = await axios({
    method: "POST",
    url: process.env.REACT_APP_BACKEND_URL + "/oauth/login/naver",
    data: member,
  });
  return result;
};
