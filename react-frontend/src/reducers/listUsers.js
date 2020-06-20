import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  list: [
    {
      id: null,
      firs_name: null,
      last_name: null,
      profile_image_url: null,
    },
  ],
  error: null,
};
const status = actionGenerator("LIST_USERS");

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
