import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import loginReducer from "reducers/loginReducer";

export default combineReducers({
  appReducer,
  loginReducer,
});
