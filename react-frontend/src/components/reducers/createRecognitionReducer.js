import createRecognitionAction from "components/actions/createRecognitionAction";

function reducer(state, action) {
  switch (action.type) {
    case createRecognitionAction.setUserDetails:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

export default reducer;
