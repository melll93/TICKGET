export const SET_ROOM = "CHAT/SET_ROOM";
export const SET_MSG = "CHAT/SET_MSG";

// Action을 dispatch를 통해 store 전달할 때 호출되는 함수
// 이것이 reducer에 전달되면 switch문에서 변화
export const setRoom = (room) => {
  return {
    type: SET_ROOM,
    room: room,
  };
};

export const setRecentMsg = (msg) => {
  return {
    type: SET_MSG,
    msg: msg,
  };
};
