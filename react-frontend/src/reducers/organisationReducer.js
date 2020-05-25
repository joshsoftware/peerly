const defaultState = {
  list: null,
};

export default function organisationList(state = defaultState, action) {
  switch (action.type) {
    case "LIST_ON_SUCCESS":
      return action.value;
    case "LIST_ON_FAILURE":
      return action.value;
    default:
      return state;
  }
}
