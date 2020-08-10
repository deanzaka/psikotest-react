import { rmibTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("rmib-template"));
const initialState = template
  ? {
      hasError: false,
      startDialogOpen: false,
      endDialogOpen: false,
      timeUp: false,
      template,
    }
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case rmibTypes.RMIB_GET_TEMPLATE:
      return { ...state, hasError: false, template: action.payload };
    case rmibTypes.RMIB_UPDATE_TEMPLATE:
      return {
        ...state,
        template: {
          _id: action.payload._id,
          doc: action.payload.doc,
        },
      };
    case rmibTypes.RMIB_SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    case rmibTypes.RMIB_SET_START_DIALOG_OPEN:
      return {
        ...state,
        startDialogOpen: action.payload,
      };
    case rmibTypes.RMIB_SET_END_DIALOG_OPEN:
      return {
        ...state,
        endDialogOpen: action.payload,
      };
    case rmibTypes.RMIB_SET_TIME_UP:
      return {
        ...state,
        timeUp: action.payload,
      };
    case rmibTypes.RMIB_CLEAR:
      return {};
    default:
      return state;
  }
};
