import axios from "axios";

const access_token = window.localStorage.getItem("access_token");

export const searchById = async (memberId) => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888" + "/member/searchById",
    params: {
      memberId,
    },
  }).then((res) => res.data);

  return result;
};

/**************
 * @return boolean
 */
export const checkFollowDB = async (friendId) => {
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
