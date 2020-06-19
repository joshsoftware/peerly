import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  list: [
    {
      id: null,
      text: null,
      org_id: null,
      thumbnail_url: null,
    },
  ],
  error: null,
};

const status = actionGenerator("CORE_VALUE_LIST");

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
