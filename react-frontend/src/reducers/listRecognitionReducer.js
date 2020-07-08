import actionGenerator from "utils/actionGenerator";
import { LIST_RECOGNITION, GIVE_HI5 } from "constants/actionConstants";

export const defaultState = {
  status: null,
  list: [
    {
      id: null,
      text: null,
      given_at: null,
      given_for_user: {
        id: null,
        first_name: null,
        last_name: null,
        profile_image_url: null,
      },
      given_by_user: {
        id: null,
        first_name: null,
        last_name: null,
        profile_image_url: null,
      },
      coreValue: {
        id: null,
        text: null,
        description: null,
        thumbnail_url: null,
      },
      hi5_count: null,
    },
  ],
  hi5: {
    data: {},
    error: { code: undefined },
  },
  error: {
    code: null,
    message: null,
  },
  limit: 3,
  offset: 0,
};

const status = actionGenerator(LIST_RECOGNITION);
const hi5Status = actionGenerator(GIVE_HI5);

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        status: null,
        list: [
          {
            id: null,
            text: null,
            given_at: null,
            given_for_user: {
              id: null,
              first_name: null,
              last_name: null,
              profile_image_url: null,
            },
            given_by_user: {
              id: null,
              first_name: null,
              last_name: null,
              profile_image_url: null,
            },
            coreValue: {
              id: null,
              text: null,
              description: null,
              thumbnail_url: null,
            },
            hi5_count: null,
          },
        ],
        hi5: {
          data: {},
          error: { code: undefined },
        },
        error: null,
        limit: 3,
        offset: 0,
      };
    case status.success:
      return {
        ...state,
        status: action.payload.status,
        list: action.payload.list,
        offset: action.payload.offset,
      };
    case status.failure:
      return { ...state, error: action.payload };
    case hi5Status.failure:
      return { ...state, hi5: { data: {}, error: action.payload } };
    case hi5Status.success:
      return {
        ...state,
        hi5: { data: action.payload.data, error: {} },
      };
    case hi5Status.init:
      return { ...state, hi5: { data: {}, error: {} } };
    default:
      return state;
  }
};
