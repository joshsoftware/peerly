import { put, takeEvery, spawn, call } from "redux-saga/effects";

import getJson from "utils/getJson";

function* getUsers(action) {
  try {
    const response = yield call(getJson, {
      path: "http://localhost:3120/users",
      apiToken: action.payload,
      signal: "",
      additionalHeaders: "",
    });
    const responseObj = yield response.json();
    yield put({ type: "GET_USER", value: responseObj.data });
  } catch (error) {
    yield put({ type: "GET_USER_FAILURE", value: error });
  }
}

function* getUser() {
  yield takeEvery("GET_USERS", getUsers);
}

export default function* rootSaga() {
  yield spawn(getUser);
}
