import axios from "axios";

export const sendNaverMember = async (member) => {
  const result = await axios({
    method: "POST",
    url: "http://localhost:8888/oauth/login/naver/callback",
    data: member,
  });
  return result;
};
