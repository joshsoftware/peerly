const createRecognitionAction = {
  setUserDetails: "SET_DETAILS",
};

export const setDetails = (param) => {
  return {
    type: createRecognitionAction.setUserDetails,
    payload: param,
  };
};

export default createRecognitionAction;
