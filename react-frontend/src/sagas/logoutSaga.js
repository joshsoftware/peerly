import { takeEvery, spawn, call, select } from "redux-saga/effects";

import PostJson from "utils/postJson";
//import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LOGOUT_API } from "constants/actionConstants";

export function* logout() {
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  //const status = actionGenerator(USER_PROFILE);
  try {
    const response = yield call(PostJson, {
      path: "/logout",
      apiToken: token,
    });
    if (response.status === 200) {
      localStorage.clear();
    }
  } catch (error) {
    // yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* logoutApi() {
  const status = actionGenerator(LOGOUT_API);
  yield takeEvery(status.success, logout);
}

export default function* userProfileSaga() {
  yield spawn(logoutApi);
}
