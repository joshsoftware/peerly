import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import recognitionReducer from "reducers/recognitionReducer";

export default combineReducers({
  appReducer,
  recognitionReducer,
});
