import { combineReducers } from "redux";

import appReducer from "reducers/appReducer.js";
import listRecognitionReducer from "reducers/listRecognitionReducer";
import loginReducer from "reducers/loginReducer";
import coreValueListReducer from "reducers/coreValueListReducer";
import RecognizeToReducer from "reducers/recognizeToReducer";
import userListReducer from "reducers/listUsers";
import userProfileReducer from "reducers/userProfileReducer";
import addRecognitionReducer from "reducers/addRecognitionReducer";
import s3SignedUrlReducer from "reducers/s3SignedUrlReducer";
import filterRecognitionReducer from "reducers/filterRecognitionReducer";
import userProfileUpdateReducer from "reducers/userProfileUpdateReducer";
import hi5StatusResponseReducer from "reducers/hi5StatusResponseReducer";
import filterStatus from "reducers/filterStatus";

export default combineReducers({
  appReducer,
  listRecognitionReducer,
  loginReducer,
  coreValueListReducer,
  RecognizeToReducer,
  userListReducer,
  userProfileReducer,
  addRecognitionReducer,
  s3SignedUrlReducer,
  filterRecognitionReducer,
  userProfileUpdateReducer,
  hi5StatusResponseReducer,
  filterStatus,
});
