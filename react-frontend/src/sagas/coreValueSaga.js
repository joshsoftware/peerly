import { put, takeLeading, spawn, call } from "redux-saga/effects";
import postJson from "utils/postJson";

export function* createCoreValue(action) {
  try {
    const response = yield call(postJson, {
      path: "organisations/3/core_values/",
      paramsObj: action.payload,
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE4LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwNDY1MDM0LCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwNDY1MDM0LCJleHAiOjE1OTA1MDEwMzR9.on9odD7zsg4sjoEX_iEhY5A9u5oaqJANIN5B4_pJAHM",
    });
    const responseObj = yield response.json();
    yield put({
      type: "CREATE_CORE_VALUE_SUCCESS",
      payload: [responseObj.data],
    });
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
