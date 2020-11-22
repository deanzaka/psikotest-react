import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bigFiveReducer from "./bigFiveReducer";
import rmibReducer from "./rmibReducer";
import { rootTypes } from "../actions/types";
import stressReducer from "./stressReducer";
import lonelinessReducer from "./lonelinessReducer";
import storyReducer from "./storyReducer";

const appReducer = combineReducers({
  login: loginReducer,
  bigFive: bigFiveReducer,
  stress: stressReducer,
  loneliness: lonelinessReducer,
  story: storyReducer,
  rmib: rmibReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === rootTypes.DESTROY_SESSION) {
    localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
