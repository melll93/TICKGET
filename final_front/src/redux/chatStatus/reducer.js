import { SET_MSG, SET_ROOM } from "./action";
import { recentMessage, roomStatus } from "./state";
// 아래 toastInfo 함수 이름을 직접 사용 Xxx
export function roomReducer(state = roomStatus, action) {
  switch (action.type) {
    case SET_ROOM:
      return {
        ...state,
        room: action.room,
      };

    default:
      return { ...state };
  }
}

export function recentMsgReducer(state = recentMessage, action) {
  switch (action.type) {
    case SET_MSG:
      return {
        ...state,
        msg: action.msg,
      };

    default:
      return { ...state };
  }
}
