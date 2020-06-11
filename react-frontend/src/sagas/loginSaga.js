import { put, takeLatest, call } from "redux-saga/effects";

import PostJson from "utils/postJson";
import actionGenerator from "utils/actionGenerator";
import { LOGIN_API, LOGIN } from "constants/actionConstants";
import actionObjectGenerator from "actions/actionObjectGenerator";

export function* userLogin(action) {
  const actionStatus = actionGenerator(LOGIN);
  try {
    const response = yield call(PostJson, {
      path: "/oauth/google",
      paramsObj: { access_token: action.payload },
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      const dispatchObject = actionObjectGenerator(actionStatus.success, {
        status: response.status,
        value: responseObj.data,
      });
      yield put(dispatchObject);
    } else {
      const dispatchObject = actionObjectGenerator(actionStatus.failure, {
        status: response.status,
        value: responseObj.data,
      });
      yield put(dispatchObject);
    }
  } catch (error) {
    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      value: error,
    });
    yield put(dispatchObject);
  }
}

export function* loginApi() {
  const actionStatus = actionGenerator(LOGIN_API);
  yield takeLatest(actionStatus.success, userLogin);
}
