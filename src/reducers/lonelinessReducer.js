import { lonelinessTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("lone-template"));
const initialState = template
  ? {
      complete: false,
      hasError: false,
      startDialogOpen: false,
      endDialogOpen: false,
      timeUp: false,
      isExists: false,
      template,
    }
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case lonelinessTypes.LONELINESS_GET_TEMPLATE:
      return { ...state, hasError: false, template: action.payload };
    case lonelinessTypes.LONELINESS_UPDATE_TEMPLATE:
      return {
        ...state,
        template: {
          _id: action.payload._id,
          doc: action.payload.doc,
        },
      };
    case lonelinessTypes.LONELINESS_SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    case lonelinessTypes.LONELINESS_SET_START_DIALOG_OPEN:
      return {
        ...state,
        startDialogOpen: action.payload,
      };
    case lonelinessTypes.LONELINESS_SET_END_DIALOG_OPEN:
      return {
        ...state,
        endDialogOpen: action.payload,
      };
    case lonelinessTypes.LONELINESS_SET_TIME_UP:
      return {
        ...state,
        timeUp: action.payload,
      };
    case lonelinessTypes.LONELINESS_CHECK_EXISTS:
      return {
        ...state,
        isExists: action.payload,
      };
    case lonelinessTypes.LONELINESS_CLEAR:
      return {};
    default:
      return state;
  }
};
