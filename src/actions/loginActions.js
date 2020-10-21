import { loginService, updateProfileService } from "../services/userService";
import { loginTypes } from "./types";

export const loginAction = (_id, password) => async (dispatch) => {
  try {
    dispatch({ type: loginTypes.LOGIN_REQUEST, payload: { _id } });
    const user = await loginService(_id, password);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: loginTypes.LOGIN_SUCCESS, payload: user });
    return null;
  } catch (err) {
    dispatch({ type: loginTypes.LOGIN_FAILED, payload: err.toString() });
    return err;
  }
};

export const updateProfileAction = (token, userData) => async (dispatch) => {
  try {
    await updateProfileService(token, userData);
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: loginTypes.PROFILE_UPDATE, payload: userData });
  } catch (err) {
    return err;
  }
};
