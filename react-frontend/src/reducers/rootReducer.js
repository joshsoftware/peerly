import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import listRecognitionReducer from "reducers/listRecognitionReducer";
import loginReducer from "reducers/loginReducer";

export default combineReducers({
  appReducer,
  listRecognitionReducer,
  loginReducer,
});
