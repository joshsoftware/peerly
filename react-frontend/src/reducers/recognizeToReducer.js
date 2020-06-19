import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  data: null,
  error: null,
};

const status = actionGenerator("RECOGNIZE_TO");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.success:
      return { ...state, data: action.payload };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
