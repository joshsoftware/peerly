import { takeEvery, all } from "redux-saga/effects";
//import { call } from 'redux-saga/effects';

import LoginApi from "utils/postJson";

function* googleLogin() {
  LoginApi({ access_token: "" }).then();
  yield;
}

function* watchIncrementAsync() {
  yield takeEvery("GOOGLE_LOGIN_SUCCESS", googleLogin);
}

export default function* rootSaga() {
  yield all([watchIncrementAsync()]);
}
