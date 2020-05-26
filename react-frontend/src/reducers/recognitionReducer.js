const defaultState = [{}];

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_RECOGNITION_LIST_SUCCESS":
      return action.value;
    case "GET_RECOGNITION_LIST_FAILURE":
      return action.value;
    default:
      return state;
  }
};
