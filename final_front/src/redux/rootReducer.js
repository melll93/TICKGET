import { combineReducers } from "redux";
import userStatus from "./userAuth/reducer";
import toastStatus from "./toastStatus/reducer";

const rootReducer = combineReducers({
  userStatus,
});

export default rootReducer;
