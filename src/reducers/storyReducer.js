import { storyTypes } from "../actions/types";

let document = JSON.parse(localStorage.getItem("story-doc"));
const initialState = document
  ? {
      endDialogOpen: false,
      isExists: false,
    }
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case storyTypes.STORY_SET_END_DIALOG_OPEN:
      return {
        ...state,
        endDialogOpen: action.payload,
      };
    case storyTypes.STORY_CHECK_EXISTS:
      return {
        ...state,
        isExists: action.payload,
      };
    case storyTypes.STORY_CLEAR:
      return {};
    default:
      return state;
  }
};
