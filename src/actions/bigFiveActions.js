import { getTemplateService } from "../services/bigFiveService";
import { bigFiveTypes } from "./types";

export const getTemplateAction = () => async (dispatch) => {
  try {
    const template = await getTemplateService();
    localStorage.setItem("template", JSON.stringify(template));
    dispatch({ type: bigFiveTypes.GET_TEMPLATE, payload: template });
  } catch (err) {
    dispatch({
      type: bigFiveTypes.REQUEST_FAILED,
      payload: err.toString(),
    });
    return err;
  }
};

export const updateTemplateAction = (template) => (dispatch) => {
  localStorage.setItem("template", JSON.stringify(template));
  dispatch({ type: bigFiveTypes.UPDATE_TEMPLATE, payload: template });
};

export const setStartDialogOpen = (startDialogOpen) => (dispatch) => {
  dispatch({
    type: bigFiveTypes.SET_START_DIALOG_OPEN,
    payload: startDialogOpen,
  });
};

export const setEndDialogOpen = (endDialogOpen) => (dispatch) => {
  dispatch({ type: bigFiveTypes.SET_END_DIALOG_OPEN, payload: endDialogOpen });
};

export const setHasError = (hasError) => (dispatch) => {
  dispatch({ type: bigFiveTypes.SET_HAS_ERROR, payload: hasError });
};
