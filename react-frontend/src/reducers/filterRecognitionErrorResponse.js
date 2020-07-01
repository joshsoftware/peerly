import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  error: {
    code: null,
    message: null,
  },
};

const status = actionGenerator("FILTER_ERROR_STATUS");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        ...state,
        error: {
          code: null,
          message: null,
        },
      };
    case status.success:
      return {
        ...state,
        error: {
          code: null,
          message: null,
        },
      };
    case status.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
