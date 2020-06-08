const defaultState = {
  status: null,
  data: { token: null },
  error: { message: null },
};

export default function access_token(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.value,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.value,
      };
    default:
      return state;
  }
}
