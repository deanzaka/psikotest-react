import { loginService, updateProfileService } from "../services/userService";
import { loginTypes } from "./types";

export const loginAction = (_id, password) => async (dispatch) => {
  try {
    dispatch({ type: loginTypes.LOGIN_REQUEST, payload: { _id } });
    const user = await loginService(_id, password);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: loginTypes.LOGIN_SUCCESS, payload: user });

    let complete = true;
    const check = [
      "name",
      "address",
      "phone",
      "birthDate",
      "gender",
      "education",
      "occupation",
    ];
    for (let item of check) {
      if (!user[item]) {
        complete = false;
        break;
      }
    }
    if (complete) {
      return null;
    } else {
      return "incomplete";
    }
  } catch (err) {
    dispatch({ type: loginTypes.LOGIN_FAILED, payload: err.toString() });
    return err;
  }
};

export const updateProfileAction = (userData) => async (dispatch) => {
  try {
    await updateProfileService(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: loginTypes.PROFILE_UPDATE, payload: userData });
    return null;
  } catch (err) {
    return err;
  }
};
