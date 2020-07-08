import { put, spawn, call, takeLeading, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LIST_HI5, LIST_HI5_API } from "constants/actionConstants";

export function* getRecognitionHi5List() {
  const status = actionGenerator(LIST_HI5);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const listReducer = yield select((state) => state.recognitionHi5List);
  const recognitionId = localStorage.getItem("recognitionHi5Id");

  try {
    const response = yield call(getJson, {
      path: "/recognitions/" + recognitionId + "/hi5",
      paramsObj: {
        limit: listReducer.limit,
        offset: listReducer.offset,
      },
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      if (listReducer.data.length === 1) {
        yield put(
          actionObjectGenerator(status.success, {
            data: responseObj.data,
            offset: responseObj.data.length,
          })
        );
      } else {
        let offsetVariable = listReducer.data.length + responseObj.data.length;
        yield put(
          actionObjectGenerator(status.success, {
            data: listReducer.data.concat(responseObj.data),
            offset: offsetVariable,
          })
        );
      }
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
