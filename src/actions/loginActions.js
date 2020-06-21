import { loginService } from "../services/userService";
import { loginTypes } from "./types";

export const loginAction = (_id, password) => async (dispatch) => {
  const request = (user) => {
    return { type: loginTypes.LOGIN_REQUEST, payload: user };
  };
  const success = (user) => {
    return { type: loginTypes.LOGIN_SUCCESS, payload: user };
  };
  const failure = (error) => {
    return { type: loginTypes.LOGIN_FAILED, payload: error };
  };

  try {
    dispatch(request({ _id }));
    const user = await loginService(_id, password);
    dispatch(success(user));
    return null;
  } catch (err) {
    dispatch(failure(err.toString()));
    return err;
  }
};
