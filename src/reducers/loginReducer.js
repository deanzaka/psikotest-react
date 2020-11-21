import { loginTypes } from "../actions/types";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return { ...state, loggingIn: true, user: action.payload };
    case loginTypes.LOGIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.payload };
    case loginTypes.LOGIN_FAILED:
      return {};
    case loginTypes.PROFILE_UPDATE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
