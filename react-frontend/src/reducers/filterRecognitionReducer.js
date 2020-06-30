import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  filterData: {
    core_value_id: null,
    given_for: null,
    given_by: null,
  },
  error: {
    code: null,
    message: null,
  },
};

const status = actionGenerator("FILTER_RECOGNITION");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        ...state,
        filterData: {
          core_value_id: null,
          given_for: null,
          given_by: null,
        },
        error: {
          code: null,
          message: null,
        },
      };
    case status.success:
      return {
        ...state,
        filterData: action.payload,
        error: {
          code: null,
          message: null,
        },
      };
    case status.failure:
      return {
        ...state,
        filterData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
