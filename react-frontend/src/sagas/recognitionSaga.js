import { put, takeEvery, spawn, call } from "redux-saga/effects";
import getJson from "utils/getJson";

import actionGenerator from "utils/actionGenerator";

export function* getRecognitionList() {
  const status = actionGenerator("LIST_RECOGNITION");
  try {
    const response = yield call(getJson, {
      path: "recognitions",
      apiToken: "",
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put({
        type: status.success,
        payload: responseObj.data,
      });
    } else {
      yield put({
        type: status.failure,
        payload: responseObj.error,
      });
    }
  } catch (error) {
    yield put({ type: status.failure, payload: error });
  }
}

export function* recognitionApi() {
  yield takeEvery("LIST_RECOGNITION_API", getRecognitionList);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
