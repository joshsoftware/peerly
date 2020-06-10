import actionGenerator from "utils/actionGenerator";

const actionStatus = actionGenerator("LOGIN");

const defaultState = {
  status: null,
  data: { token: null },
  error: { message: null },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionStatus.success:
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.value,
      };
    case actionStatus.failure:
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.value,
      };
    default:
      return state;
  }
};
