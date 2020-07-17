import { bigFiveTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("template"));
const initialState = template
  ? { complete: false, hasError: false, template }
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case bigFiveTypes.GET_TEMPLATE:
      return { ...state, hasError: false, template: action.payload };
    case bigFiveTypes.UPDATE_TEMPLATE:
      return {
        ...state,
        template: {
          _id: action.payload._id,
          doc: action.payload.doc,
        },
      };
    case bigFiveTypes.SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    case bigFiveTypes.REQUEST_FAILED:
      return state;
    default:
      return state;
  }
};
