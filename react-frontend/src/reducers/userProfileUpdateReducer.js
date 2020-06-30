import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  status: null,
  error: null,
};

const status = actionGenerator("USER_PROFILE_UPDATE_RESPONSE");

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
