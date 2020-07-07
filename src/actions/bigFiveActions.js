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
