import { put, takeEvery, spawn, call } from "redux-saga/effects";
import getJson from "utils/getJson";

export function* getList() {
  try {
    const response = yield call(getJson, {
      path: "organisations/3/core_values",
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE5LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwMzc0NTYwLCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwMzc0NTYwLCJleHAiOjE1OTA0MTA1NjB9.beYCWxqM-IvjWZOG4ceQTuPcsEWHzPll7DBEwdO2bII",
    });
    const responseObj = yield response.json();
    yield put({ type: "GET_LIST_SUCCESS", payload: responseObj.data });
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", payload: error });
  }
}

export function* loginApi() {
  yield takeEvery("LOGIN_API", getList);
}

export default function* rootSaga() {
  yield spawn(loginApi);
}
