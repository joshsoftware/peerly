export const initialState = {
  authToken: "",
};
const LoginReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        authToken: action.payload.token,
      };
    default:
      return state;
  }
};

export default LoginReducer;
