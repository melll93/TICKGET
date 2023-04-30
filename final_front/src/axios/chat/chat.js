import axios from "axios";
const access_token = window.localStorage.getItem("access_token");

export const createChatRoom = async (members) => {
  const result = await axios({
    method: "POST",
    url:
      "http://localhost:8888" +
      // +process.env.BACKEND_URL
      "/chat/createChatRoom",
    // headers: { Authorization: "Bearer " + access_token },
    data: members,
  }).then(console.log);
};

export const getChatRoomList = async () => {
  const result = await axios({
    method: "GET",
    url:
      "http://localhost:8888" +
      // +process.env.BACKEND_URL
      "/chat/getChatRoomList",
    headers: { Authorization: "Bearer " + access_token },
  }).then((res) => {
    // console.log(res);
    return res.data;
  });

  return result;
};
