import { put, takeLeading, spawn, call } from "redux-saga/effects";
import postJson from "utils/postJson";

export function* createCoreValue(coreValueData) {
  try {
    const response = yield call(postJson, {
      path: "organisations/3/core_values/",
      body: coreValueData,
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE5LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwMzc0NTYwLCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwMzc0NTYwLCJleHAiOjE1OTA0MTA1NjB9.beYCWxqM-IvjWZOG4ceQTuPcsEWHzPll7DBEwdO2bII",
    });
    const responseObj = yield response.json();
    yield put({ type: "CREATE_CORE_VALUE_SUCCESS", payload: responseObj.data });
  } catch (error) {
    yield put({ type: "CREATE_CORE_VALUE_FAILURE", payload: error });
  }
}

export function* coreValueApi() {
  yield takeLeading("CORE_VALUE_API", createCoreValue);
}

export default function* rootSaga() {
  yield spawn(coreValueApi);
}
