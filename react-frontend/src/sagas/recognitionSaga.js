import { put, takeEvery, spawn, call } from "redux-saga/effects";
import GetJson from "utils/getJson";

export function* getRecognitionList(action) {
  try {
    const response = yield call(GetJson, {
      path: "recognitions",
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE4LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwNDY1MDM0LCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwNDY1MDM0LCJleHAiOjE1OTA1MDEwMzR9.on9odD7zsg4sjoEX_iEhY5A9u5oaqJANIN5B4_pJAHM",
      paramsObj: action.payload,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put({
        type: "GET_RECOGNITION_LIST_SUCCESS",
        payload: responseObj.data,
      });
    } else {
      yield put({
        type: "GET_RECOGNITION_LIST_FAILURE",
        payload: responseObj.error,
      });
    }
  } catch (error) {
    yield put({ type: "GET_RECOGNITION_LIST_FAILURE", payload: error });
  }
}

export function* recognitionApi() {
  yield takeEvery("RECOGNITION_GET_API", getRecognitionList);
}

export default function* rootSaga() {
  yield spawn(recognitionApi);
}
