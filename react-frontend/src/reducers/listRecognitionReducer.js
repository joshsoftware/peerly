import actionGenerator from "utils/actionGenerator";
import { LIST_RECOGNITION, GIVE_HI5 } from "constants/actionConstants";

export const defaultState = {
  list: [
    {
      coreValue: {},
      given_for_user: {},
      given_by_user: {},
      recognition_hi5s: [null],
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

const status = actionGenerator(LIST_RECOGNITION);
const hi5Status = actionGenerator(GIVE_HI5);

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.init:
      return {
        list: [
          {
            coreValue: {},
            given_for_user: {},
            given_by_user: {},
            recognition_hi5s: [],
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
