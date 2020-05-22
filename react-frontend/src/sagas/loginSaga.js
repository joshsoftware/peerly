import { put, takeEvery, spawn, call } from "redux-saga/effects";

import PostJson from "utils/postJson";

function* userLogin(action) {
  try {
    const response = yield call(PostJson, { access_token: action.payload });
    const responseObj = yield response.json();
    yield put({ type: "LOGIN_SUCCESS", value: responseObj.data });
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", value: error });
  }
}

function* loginApi() {
  yield takeEvery("LOGIN_API", userLogin);
}

export default function* rootSaga() {
  yield spawn(loginApi);
}
