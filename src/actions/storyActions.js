import { checkExists, submitStoryService } from "../services/storyService";
import { storyTypes } from "./types";

export const checkExistsAction = (accessToken) => async (dispatch) => {
  const isExists = await checkExists(accessToken);
  dispatch({ type: storyTypes.STORY_CHECK_EXISTS, payload: isExists });
};

export const submitStoryAction = async (accessToken, content) => {
  console.log(content);
  await submitStoryService(accessToken, content);
  localStorage.removeItem("story-content");
};

export const setEndDialogOpen = (endDialogOpen) => (dispatch) => {
  dispatch({
    type: storyTypes.STORY_SET_END_DIALOG_OPEN,
    payload: endDialogOpen,
  });
};
