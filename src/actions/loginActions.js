import axios from "axios";
import { loginTypes } from "./types";

export const login = (_id, password) => async (dispatch) => {
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
    const res = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
      _id,
      password,
    });
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch(success(res.data));
  } catch (err) {
    dispatch(failure(err.toString()));
  }
};
