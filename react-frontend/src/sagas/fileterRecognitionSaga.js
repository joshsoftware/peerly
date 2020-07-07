import { put, spawn, call, takeLeading, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import {
  LIST_RECOGNITION,
  FILTER_RECOGNITION_API,
  FILTER_ERROR_STATUS,
} from "constants/actionConstants";

export function* getRecognitionFilterList() {
  const filterStatus = actionGenerator(FILTER_ERROR_STATUS);
  const status = actionGenerator(LIST_RECOGNITION);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const listReducer = yield select((state) => state.listRecognitionReducer);
  const filterRecognition = yield select(
    (state) => state.filterRecognitionReducer
  );
  try {
    const response = yield call(getJson, {
      path: "/recognitions",
      paramsObj: {
        limit: listReducer.limit,
        offset: 0,
        core_value_id: filterRecognition.filterData.core_value_id
          ? filterRecognition.filterData.core_value_id
          : undefined,
        given_by: filterRecognition.filterData.given_by
          ? filterRecognition.filterData.given_by
          : undefined,
        given_for: filterRecognition.filterData.given_for
          ? filterRecognition.filterData.given_for
          : undefined,
      },
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put(
        actionObjectGenerator(status.success, {
          list: responseObj.data,
        })
      );
    } else {
      yield put(actionObjectGenerator(filterStatus.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* recognitionApi() {
  const status = actionGenerator(FILTER_RECOGNITION_API);
  yield takeLeading(status.success, getRecognitionFilterList);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
