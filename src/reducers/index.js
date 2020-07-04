import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bigFiveReducer from "./bigFiveReducer";

export default combineReducers({
  login: loginReducer,
  bigFive: bigFiveReducer,
});
