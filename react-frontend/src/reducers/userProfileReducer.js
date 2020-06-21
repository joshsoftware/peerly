import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  data: {
    id: null,
    profile_image_url: null,
    first_name: null,
    last_name: null,
    display_name: null,
    hi5_quota_balance: null,
  },
  error: null,
};

const status = actionGenerator("USER_PROFILE");

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
