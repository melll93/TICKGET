import axios from "axios";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";

const access_token = window.localStorage.getItem("access_token");
const cookies = new Cookies();

/***************************************
 * @param { memberId, memberPassword }
 ***************************************/
export const login = async (paramMember) => {
  const result = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url:
      // process.env.BACKEND_URL + "/login",
      process.env.REACT_APP_BACKEND_URL + "/login",
    data: paramMember,
  })
    .then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status < 400) {
        Swal.fire({
          title: "로그인 성공",
          icon: "success",
        })
          .then((result) => {
            console.log(result);

            const token = res.data;
            console.log(token);
            window.localStorage.setItem("access_token", token);
          })
          .then(() => {
            window.location.href = "/";
          });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "로그인 실패\n" + error,
        icon: "error",
      });
    });
};

export const searchById = async (memberId) => {
  const result = await axios({
    method: "GET",
    url: process.env.REACT_APP_BACKEND_URL + "/member/searchById",
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
    url: process.env.REACT_APP_BACKEND_URL + "/member/checkFollow",
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
    url: process.env.REACT_APP_BACKEND_URL + "/member/addFollow",
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
        url:
          process.env.REACT_APP_BACKEND_URL +
          "/member/memberProfileImageUpdate",
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
    url: process.env.REACT_APP_BACKEND_URL + "/member/getMemberData",
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
