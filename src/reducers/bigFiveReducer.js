import { bigFiveTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("template"));
const initialState = template ? { inSession: true, template } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case bigFiveTypes.GET_TEMPLATE:
      return { inSession: true, template: action.payload };
    case bigFiveTypes.REQUEST_FAILED:
      return {};
    default:
      return state;
  }
};
