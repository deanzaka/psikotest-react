import { loginTypes } from "../actions/types";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default function (state = initialState, action) {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return { loggingIn: true, user: action.payload };
    case loginTypes.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.payload };
    case loginTypes.LOGIN_FAILED:
      return {};
    default:
      return state;
  }
}
