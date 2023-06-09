import { LOGIN, LOGOUT, SETUSER } from "./action";
import { userInfo } from "./state";
export default function userStatus(state = userInfo, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        isLogin: action.isLogin,
      };

    case LOGOUT:
      return {
        ...state,
        user: action.user,
        isLogin: action.isLogin,
      };

      case SETUSER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return { ...state };
  }
}
