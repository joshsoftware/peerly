const initialState = [
  {
    id: 2,
    org_id: 3,
    text: "good work",
    description: "good working in peerly",
    parent_core_value_id: null,
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_SUCCESS":
      return action.payload;
    case "LOGIN_FAILURE":
      return action.payload;
    default:
      return state;
  }
};
