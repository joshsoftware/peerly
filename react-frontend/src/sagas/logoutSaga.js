import { takeEvery, spawn, call, select } from "redux-saga/effects";

import getJson from "utils/getJson";
//import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LOGOUT_API } from "constants/actionConstants";

export function* logout() {
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  //const status = actionGenerator(USER_PROFILE);
  try {
    yield call(getJson, {
      path: "/logout",
      apiToken: token,
    });
    // const responseObj = yield response.json();
    /*if (responseObj.data) {
      yield put(actionObjectGenerator(status.success, responseObj.data));
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }*/
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
