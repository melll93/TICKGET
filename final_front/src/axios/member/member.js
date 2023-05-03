import axios from "axios";
import { Cookies } from "react-cookie";

const access_token = window.localStorage.getItem("access_token");
const cookies = new Cookies();

export const searchById = async (memberId) => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888" + "/member/searchById",
    headers: { Authorization: "Bearer " + access_token },
    params: {
      memberId,
    },
  }).then((res) => res.data);

  return result;
};

/**************
 * @return boolean
 */
export const checkFollowDB = async (friendId, access_token) => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888" + "/member/checkFollow",
    headers: { Authorization: "Bearer " + access_token },
    params: {
      friendId,
    },
  }).then((res) => res.data);

  return result;
};

export const addFollowDB = async (friendId) => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888" + "/member/addFollow",
    headers: { Authorization: "Bearer " + access_token },
    params: {
      friendId,
    },
  }).then((res) => res.data);

  return result;
};

export const memberPofileImageUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/member/memberProfileImageUpdate",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserData = async (token) => {
  const result = await axios({
    method: "POST",
    url: "http://localhost:8888" + "/member/getMemberData",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    const _userData = res.data;
    cookies.set("_userData", _userData);
    return _userData;
  });
  return result;
};
