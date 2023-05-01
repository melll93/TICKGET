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
  });

  return result;
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

export const getChatByRoom = async (room) => {
  const result = await axios({
    method: "GET",
    url:
      "http://localhost:8888" +
      // +process.env.BACKEND_URL
      "/chat/getChatByRoom",
    headers: { Authorization: "Bearer " + access_token },
    params: {
      roomNo: room,
    },
  }).then((res) => {
    console.log(res.data);
    return res.data;
  });

  return result;
};
