import { combineReducers } from "redux";
import userStatus from "./userAuth/reducer";
import toastStatus from "./toastStatus/reducer";
import { roomReducer, recentMsgReducer } from "./chatStatus/reducer";

const rootReducer = combineReducers({
  userStatus,
  toastStatus,
  roomReducer,
  recentMsgReducer,
});

export default rootReducer;
