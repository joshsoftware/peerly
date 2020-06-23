import actionGenerator from "utils/actionGenerator";

export const defaultState = {
  status: null,
  data: null,
  error: { message: null },
};

const status = actionGenerator("ADD_RECOGNITION");

export default (state = defaultState, action) => {
  switch (action.type) {
    case status.success:
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.value,
        error: { message: null },
      };
    case status.failure:
      return {
        ...state,
        status: action.payload.status,
        data: null,
        error: action.payload.value,
      };
    default:
      return state;
  }
};
