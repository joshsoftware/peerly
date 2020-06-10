import { put, takeEvery, call } from "redux-saga/effects";

import PostJson from "utils/postJson";
import actionGenerator from "utils/actionGenerator";

export function* userLogin(action) {
  const actionStatus = actionGenerator("LOGIN");
  try {
    const response = yield call(PostJson, {
      path: "/oauth/google",
      paramsObj: { access_token: action.payload },
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put({
        type: actionStatus.success,
        payload: {
          status: response.status,
          value: responseObj.data,
        },
      });
    } else {
      yield put({
        type: actionStatus.failure,
        payload: {
          status: response.status,
          value: responseObj.data,
        },
      });
    }
  } catch (error) {
    yield put({ type: actionStatus.failure, value: error });
  }
}

export function* loginApi() {
  yield takeEvery("LOGIN_API", userLogin);
}
