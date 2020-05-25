const defaultState = {
  user: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.value;
    case "GET_USER_FAILURE":
      return state;
    default:
      return state;
  }
};
