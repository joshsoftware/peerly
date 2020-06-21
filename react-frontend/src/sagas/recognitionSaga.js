import { put, spawn, call, takeLeading, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import postJson from "utils/postJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import {
  LIST_RECOGNITION,
  LIST_RECOGNITION_API,
  GIVE_HI5_API,
  GIVE_HI5,
} from "constants/actionConstants";

export function* getRecognitionList(action) {
  const status = actionGenerator(LIST_RECOGNITION);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  try {
    const response = yield call(getJson, {
      path: "/recognitions",
      paramsObj: {
        limit: action.payload.limit,
        offset: action.payload.offset,
      },
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put(
        actionObjectGenerator(status.success, {
          list: action.payload.list.concat(responseObj.data),
          offset: action.payload.offset,
          limit: action.payload.limit,
        })
      );
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* giveHi5ToRecognition(action) {
  const hi5Status = actionGenerator(GIVE_HI5);
  try {
    const response = yield call(postJson, {
      path: "recognitions/" + action.payload.id + "/hi5",
      apiToken: "",
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      yield put(
        actionObjectGenerator(hi5Status.success, {
          data: responseObj.data,
          list: action.payload.list,
        })
      );
    } else {
      yield put(actionObjectGenerator(hi5Status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(hi5Status.failure, error));
  }
}

export function* recognitionApi() {
  const status = actionGenerator(LIST_RECOGNITION_API);
  const hi5Status = actionGenerator(GIVE_HI5_API);
  yield takeLeading(status.success, getRecognitionList);
  yield takeLeading(hi5Status.success, giveHi5ToRecognition);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}
