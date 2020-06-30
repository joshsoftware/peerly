import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  filterData: {
    core_value_id: null,
    given_for: null,
    given_by: null,
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
      };
    case status.success:
      return {
        ...state,
        filterData: action.payload,
      };
    case status.failure:
      return {
        ...state,
        filterData: null,
      };
    default:
      return state;
  }
};
