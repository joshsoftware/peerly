import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  data: [
    {
      user_id: null,
      display_name: null,
      profile_image_url: null,
    },
  ],
  error: {
    code: null,
    message: null,
  },
  limit: 10,
  offset: 0,
};

const status = actionGenerator("LIST_HI5");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        data: [
          {
            user_id: null,
            display_name: null,
            profile_image_url: null,
          },
        ],
        error: {
          code: null,
          message: null,
        },
        limit: 10,
        offset: 0,
      };
    case status.success:
      return {
        ...state,
        data: action.payload.data,
        offset: action.payload.offset,
      };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
