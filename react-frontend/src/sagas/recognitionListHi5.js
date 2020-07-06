import { put, spawn, call, takeLeading, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LIST_HI5, LIST_HI5_API } from "constants/actionConstants";

export function* getRecognitionHi5List() {
  const status = actionGenerator(LIST_HI5);

  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);

  const recognitionId = localStorage.getItem("recognitionHi5Id");
  try {
    const response = yield call(getJson, {
      path: "/recognitions/" + recognitionId + "/hi5",
      apiToken: token,
    });

    const responseObj = yield response.json();

    if (responseObj.data) {
      yield put(
        actionObjectGenerator(status.success, {
          data: responseObj.data,
        })
      );
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* recognitionApi() {
  const status = actionGenerator(LIST_HI5_API);
  yield takeLeading(status.success, getRecognitionHi5List);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
