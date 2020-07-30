import { bigFiveTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("bf-template"));
const initialState = template
  ? {
      complete: false,
      hasError: false,
      startDialogOpen: false,
      endDialogOpen: false,
      timeUp: false,
      template,
    }
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case bigFiveTypes.BF_GET_TEMPLATE:
      return { ...state, hasError: false, template: action.payload };
    case bigFiveTypes.BF_UPDATE_TEMPLATE:
      return {
        ...state,
        template: {
          _id: action.payload._id,
          doc: action.payload.doc,
        },
      };
    case bigFiveTypes.BF_SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    case bigFiveTypes.BF_SET_START_DIALOG_OPEN:
      return {
        ...state,
        startDialogOpen: action.payload,
      };
    case bigFiveTypes.BF_SET_END_DIALOG_OPEN:
      return {
        ...state,
        endDialogOpen: action.payload,
      };
    case bigFiveTypes.BF_SET_TIME_UP:
      return {
        ...state,
        timeUp: action.payload,
      };
    case bigFiveTypes.BF_CLEAR:
      return {};
    default:
      return state;
  }
};
