import { put, takeEvery, takeLatest, spawn, call } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import {
  CORE_VALUE_LIST,
  CORE_VALUE_API,
  RECOGNIZE_TO,
  RECOGNIZE_TO_API,
} from "constants/actionConstants";

export function* getRecognitionList() {
  const status = actionGenerator(CORE_VALUE_LIST);
  try {
    const response = yield call(getJson, {
      path: "/core_values",
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjcsImF1ZCI6InBlZXJseS5jb20iLCJuYmYiOjE1OTI1Mjk5NDUsImh0dHBzOi8vcGVlcmx5LmNvbSI6eyJyb2xlSWQiOjIsIm9yZ0lkIjoxLCJvcmdOYW1lIjoiam9zaCJ9LCJpYXQiOjE1OTI1Mjk5NDUsImV4cCI6MTU5MjU2NTk0NX0.g8_QD5UzXLgKz8Wm1v4MfpV9l01lChE8iJEFpz_zXmA",
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put(actionObjectGenerator(status.success, responseObj.data));
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* getRecognitionTo() {
  const status = actionGenerator(RECOGNIZE_TO);
  try {
    const response = yield call(getJson, {
      path: "/users/1",
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjcsImF1ZCI6InBlZXJseS5jb20iLCJuYmYiOjE1OTI1Mjk5NDUsImh0dHBzOi8vcGVlcmx5LmNvbSI6eyJyb2xlSWQiOjIsIm9yZ0lkIjoxLCJvcmdOYW1lIjoiam9zaCJ9LCJpYXQiOjE1OTI1Mjk5NDUsImV4cCI6MTU5MjU2NTk0NX0.g8_QD5UzXLgKz8Wm1v4MfpV9l01lChE8iJEFpz_zXmA",
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put(actionObjectGenerator(status.success, responseObj.data));
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* corevalueApi() {
  const status = actionGenerator(CORE_VALUE_API);
  yield takeEvery(status.success, getRecognitionList);
}

export function* recognizeToApi() {
  const status = actionGenerator(RECOGNIZE_TO_API);
  yield takeLatest(status.success, getRecognitionTo);
}

export default function* coreValueList() {
  yield spawn(corevalueApi);
  yield spawn(recognizeToApi);
}
