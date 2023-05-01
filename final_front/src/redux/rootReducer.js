import { combineReducers } from "redux";
import userStatus from "./userAuth/reducer";
import toastStatus from "./toastStatus/reducer";
import chatStatus from "./chatStatus/reducer";

const rootReducer = combineReducers({
  userStatus,
  toastStatus,
  chatStatus,
});

export default rootReducer;
