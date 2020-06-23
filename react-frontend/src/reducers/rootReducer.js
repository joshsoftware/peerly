import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import listRecognitionReducer from "reducers/listRecognitionReducer";
import loginReducer from "reducers/loginReducer";
import coreValueListReducer from "reducers/coreValueListReducer";
import RecognizeToReducer from "reducers/recognizeToReducer";
import userListReducer from "reducers/listUsers";
import userProfileReducer from "reducers/userProfileReducer";
import addRecognitionReducer from "reducers/addRecognitionReducer";

export default combineReducers({
  appReducer,
  listRecognitionReducer,
  loginReducer,
  coreValueListReducer,
  RecognizeToReducer,
  userListReducer,
  userProfileReducer,
  addRecognitionReducer,
});
