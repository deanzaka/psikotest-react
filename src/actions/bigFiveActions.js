import { getTemplateService } from "../services/bigFiveService";
import { bigFiveTypes } from "./types";

export const getTemplateAction = () => async (dispatch) => {
  try {
    const template = await getTemplateService();
    dispatch({ type: bigFiveTypes.GET_TEMPLATE, payload: template });
  } catch (err) {
    dispatch({ type: bigFiveTypes.REQUEST_FAILED, payload: err.toString() });
    return err;
  }
};
