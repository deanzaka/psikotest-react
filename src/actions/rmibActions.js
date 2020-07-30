import { getTemplateService } from "../services/rmibService";
import { rmibTypes } from "./types";

export const getTemplateAction = () => async (dispatch) => {
  try {
    const template = await getTemplateService();
    localStorage.setItem("rmib-template", JSON.stringify(template));
    dispatch({ type: rmibTypes.RMIB_GET_TEMPLATE, payload: template });
  } catch (err) {
    dispatch({
      type: rmibTypes.RMIB_CLEAR,
      payload: err.toString(),
    });
    return err;
  }
};

export const setCurrentData = (currentData) => (dispatch) => {
  dispatch({
    type: rmibTypes.RMIB_SET_CURRENT_DATA,
    payload: currentData,
  });
};

export const setStartDialogOpen = (startDialogOpen) => (dispatch) => {
  dispatch({
    type: rmibTypes.RMIB_SET_START_DIALOG_OPEN,
    payload: startDialogOpen,
  });
};

export const setEndDialogOpen = (endDialogOpen) => (dispatch) => {
  dispatch({
    type: rmibTypes.RMIB_SET_END_DIALOG_OPEN,
    payload: endDialogOpen,
  });
};

export const setTimeUp = (timeUp) => (dispatch) => {
  dispatch({
    type: rmibTypes.RMIB_SET_TIME_UP,
    payload: timeUp,
  });
};

export const setHasError = (hasError) => (dispatch) => {
  dispatch({ type: rmibTypes.RMIB_SET_HAS_ERROR, payload: hasError });
};
