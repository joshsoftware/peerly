import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  status: null,
};

const status = actionGenerator("FILTER_STATUS");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        ...state,
        status: null,
      };
    case status.success:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
