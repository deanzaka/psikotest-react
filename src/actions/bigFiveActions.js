import {
  checkExists,
  getTemplateService,
  submitTemplateService,
} from "../services/bigFiveService";
import { bigFiveTypes } from "./types";

export const getTemplateAction = () => async (dispatch) => {
  try {
    const template = await getTemplateService();
    localStorage.removeItem("startTime");
    localStorage.setItem("bf-template", JSON.stringify(template));
    dispatch({ type: bigFiveTypes.BF_GET_TEMPLATE, payload: template });
  } catch (err) {
    dispatch({
      type: bigFiveTypes.BF_CLEAR,
      payload: err.toString(),
    });
    return err;
  }
};

export const checkExistsAction = (accessToken) => async (dispatch) => {
  const isExists = await checkExists(accessToken);
  dispatch({ type: bigFiveTypes.BF_CHECK_EXISTS, payload: isExists });
};

export const updateTemplateAction = (template) => (dispatch) => {
  localStorage.setItem("bf-template", JSON.stringify(template));
  dispatch({ type: bigFiveTypes.BF_UPDATE_TEMPLATE, payload: template });
};

export const submitTemplateAction = async (accessToken, template) => {
  await submitTemplateService(accessToken, template);
  localStorage.removeItem("bf-template");
  localStorage.removeItem("startTime");
};

export const setStartDialogOpen = (startDialogOpen) => (dispatch) => {
  dispatch({
    type: bigFiveTypes.BF_SET_START_DIALOG_OPEN,
    payload: startDialogOpen,
  });
};

export const setEndDialogOpen = (endDialogOpen) => (dispatch) => {
  dispatch({
    type: bigFiveTypes.BF_SET_END_DIALOG_OPEN,
    payload: endDialogOpen,
  });
};

export const setTimeUp = (timeUp) => (dispatch) => {
  dispatch({
    type: bigFiveTypes.BF_SET_TIME_UP,
    payload: timeUp,
  });
};

export const setHasError = (hasError) => (dispatch) => {
  dispatch({ type: bigFiveTypes.BF_SET_HAS_ERROR, payload: hasError });
};
