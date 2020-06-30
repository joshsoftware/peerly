import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  data: {
    id: null,
    profile_image_url: null,
    first_name: null,
    last_name: null,
    display_name: null,
  },
  error: null,
};

const status = actionGenerator("RECOGNIZE_TO");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return { ...state, data: action.payload };
    case status.success:
      return { ...state, data: action.payload };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
