import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  list: [
    {
      core_value: {},
      givenFor: {},
      givenBy: {},
    },
  ],
  error: {
    fields: {},
  },
};
const status = actionGenerator("LIST_RECOGNITION");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.success:
      return { ...state, list: action.payload };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
