const defaultState = {
  list: [{}],
  error: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_RECOGNITION_LIST_SUCCESS":
      return { ...state, list: action.payload };
    case "GET_RECOGNITION_LIST_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
