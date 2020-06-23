import actionGenerator from "utils/actionGenerator";
import { LOGIN } from "constants/actionConstants";
const actionStatus = actionGenerator(LOGIN);

export const defaultState = {
  status: null,
  data: { token: localStorage.getItem("jwtToken") },
  error: { message: null },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionStatus.init:
      return {
        ...state,
        status: null,
        data: { token: localStorage.getItem("jwtToken") },
        error: { message: null },
      };
    case actionStatus.success:
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.value,
        error: { message: null },
      };
    case actionStatus.failure:
      return {
        ...state,
        status: action.payload.status,
        data: { token: null },
        error: action.payload.value,
      };
    default:
      return state;
  }
};
