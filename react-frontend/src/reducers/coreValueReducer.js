const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CORE_VALUE_SUCCESS":
      return action.payload;
    case "CREATE_CORE_VALUE_FAILURE":
      return action.payload;
    default:
      return state;
  }
};
