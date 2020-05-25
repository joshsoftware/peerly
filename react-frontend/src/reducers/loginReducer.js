const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_SUCCESS":
      return action.payload;
    case "GET_LIST_FAILURE":
      return action.payload;
    default:
      return state;
  }
};
