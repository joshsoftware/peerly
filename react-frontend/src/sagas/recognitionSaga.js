import { put, takeEvery, spawn, call } from "redux-saga/effects";
import getJson from "utils/getJson";

export function* getRecognitionList(action) {
  try {
    const response = yield call(getJson, {
      path: "recognitions",
      apiToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE5LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwNTQ3MzA1LCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwNTQ3MzA1LCJleHAiOjE1OTA1ODMzMDV9.5zNi8j6IZHa0Y1lGBFjeyaNvUrh82Gf0kmOAZQHvuXg",
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

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
