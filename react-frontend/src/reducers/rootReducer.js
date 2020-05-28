import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import listRecognitionReducer from "reducers/listRecognitionReducer";

export default combineReducers({
  appReducer,
  listRecognitionReducer,
});
