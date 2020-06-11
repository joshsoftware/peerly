import { put, takeEvery, spawn, call } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionGenerator from "utils/actionGenerator";
import {
  LIST_RECOGNITION,
  LIST_RECOGNITION_API,
} from "constants/actionConstants";

export function* getRecognitionList() {
  const status = actionGenerator(LIST_RECOGNITION);
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
  const status = actionGenerator(LIST_RECOGNITION_API);
  yield takeEvery(status.success, getRecognitionList);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
