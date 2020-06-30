import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  status: null,
  error: null,
};

const status = actionGenerator("GIVE_HI5_POST_RESPONSE");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return { ...state, status: null, error: null };
    case status.success:
      return { ...state, status: action.payload };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
