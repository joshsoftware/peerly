const defaultState = {
  token: null,
  error: null,
};

export default function access_token(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, token: action.value };
    case "LOGIN_FAILURE":
      return { ...state, error: action.value };
    default:
      return state;
  }
}
