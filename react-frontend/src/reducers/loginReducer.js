const defaultState = {
  token: null,
};

export default function access_token(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return (state = action.value);
    default:
      return state;
  }
}
