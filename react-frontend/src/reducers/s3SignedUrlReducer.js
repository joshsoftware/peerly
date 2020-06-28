import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  data: {
    s3_signed_url: null,
  },
  error: null,
};

const status = actionGenerator("S3_SIGNED_URL");

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
