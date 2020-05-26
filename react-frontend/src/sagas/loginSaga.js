import { put, takeEvery, call } from "redux-saga/effects";

import PostJson from "utils/postJson";

export function* userLogin(action) {
  try {
    const response = yield call(PostJson, {
      path: "/oauth/google",
      paramsObj: { access_token: action.payload },
    });
    const responseObj = yield response.json();
    yield put({ type: "LOGIN_SUCCESS", value: responseObj.data });
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", value: error });
  }
}

export function* loginApi() {
  yield takeEvery("LOGIN_API", userLogin);
}
