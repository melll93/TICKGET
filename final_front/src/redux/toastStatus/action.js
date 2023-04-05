export const SET_MSG = "TOAST_STATUS/SET_MSG";
export const SET_FALSE = "TOAST_STATUS/SET_FALSE";

// Action을 dispatch를 통해 store 전달할 때 호출되는 함수
// 이것이 reducer에 전달되면 switch문에서 변화
export const setToastMsg = (msg) => {
  return {
    type: SET_MSG,
    msg: msg,
    bool: true,
  };
};
export const setToastFalse = () => {
  return {
    type: SET_FALSE,
    msg: "",
    bool: false,
  };
};
