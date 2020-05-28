import actionGenerator from "utils/actionGenerator";

const defaultState = {
  list: [{}],
  error: {},
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
