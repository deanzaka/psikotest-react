import { bigFiveTypes } from "../actions/types";

let template = JSON.parse(localStorage.getItem("template"));
const initialState = template ? { inSession: true, template } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case bigFiveTypes.GET_TEMPLATE:
      return { ...state, inSession: true, template: action.payload };
    case bigFiveTypes.UPDATE_TEMPLATE:
      return {
        ...state,
        template: {
          _id: action.payload._id,
          doc: action.payload.doc,
        },
      };
    case bigFiveTypes.REQUEST_FAILED:
      return state;
    default:
      return state;
  }
};
