import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import loginReducer from "reducers/loginReducer";
import coreValueReducer from "reducers/coreValueReducer";

export default combineReducers({
  appReducer,
  loginReducer,
  coreValueReducer,
});
