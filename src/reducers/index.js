import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bigFiveReducer from "./bigFiveReducer";
import { rootTypes } from "../actions/types";

const appReducer = combineReducers({
  login: loginReducer,
  bigFive: bigFiveReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === rootTypes.DESTROY_SESSION) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
