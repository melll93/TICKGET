import { SET_ROOM } from "./action";
import { roomStatus } from "./state";
// 아래 toastInfo 함수 이름을 직접 사용 Xxx
export default function setRoom(state = roomStatus, action) {
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
