import { loginService } from "../services/userService";
import { loginTypes } from "./types";

export const loginAction = (_id, password) => async (dispatch) => {
  try {
    dispatch({ type: loginTypes.LOGIN_REQUEST, payload: { _id } });
    const user = await loginService(_id, password);
    dispatch({ type: loginTypes.LOGIN_SUCCESS, payload: user });
    return null;
  } catch (err) {
    dispatch({ type: loginTypes.LOGIN_FAILED, payload: err.toString() });
    return err;
  }
};
