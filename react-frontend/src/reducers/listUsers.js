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
  starts_with: null,
  limit: 10,
  offset: 0,
};
const status = actionGenerator("LIST_USERS");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        ...state,
        list: [
          {
            id: null,
            first_name: null,
            last_name: null,
            profile_image_url: null,
          },
        ],
        starts_with: null,
        error: null,
        limit: 10,
        offset: 0,
      };
    case status.success:
      return {
        ...state,
        list:
          action.payload.list === undefined
            ? [
                {
                  id: null,
                  first_name: null,
                  last_name: null,
                  profile_image_url: null,
                },
              ]
            : action.payload.list,
        limit: action.payload.limit,
        starts_with: action.payload.starts_with,
        offset: action.payload.offset,
      };
    case status.failure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
