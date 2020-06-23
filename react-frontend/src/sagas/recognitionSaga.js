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

export function* getRecognitionList() {
  const status = actionGenerator(LIST_RECOGNITION);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const listReducer = yield select((state) => state.listRecognitionReducer);
  try {
    const response = yield call(getJson, {
      path: "/recognitions",
      paramsObj: {
        limit: listReducer.limit,
        offset: listReducer.offset,
      },
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      if (listReducer.list.length === 1) {
        yield put(
          actionObjectGenerator(status.success, {
            list: responseObj.data,
            offset: listReducer.offset + responseObj.data.length,
          })
        );
      } else {
        yield put(
          actionObjectGenerator(status.success, {
            list: listReducer.list.concat(responseObj.data),
            offset: listReducer.offset + responseObj.data.length,
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

const getUpdateCountList = (id, listRecognition) => {
  listRecognition.map((recognition) => {
    if (recognition.id === id) {
      recognition.hi5Count.push({});
      return recognition;
    }
    return recognition;
  });
};

export function* giveHi5ToRecognition(action) {
  const hi5Status = actionGenerator(GIVE_HI5);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const listRecognition = yield select(
    (state) => state.listRecognitionReducer.list
  );
  try {
    const response = yield call(postJson, {
      path: "/recognitions/" + action.payload.id + "/hi5",
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      getUpdateCountList(action.payload.id, listRecognition);
      yield put(
        actionObjectGenerator(hi5Status.success, {
          data: responseObj.data,
        })
      );
    } else {
      yield put(actionObjectGenerator(hi5Status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(hi5Status.failure, error));
  }
}

function* resetHi5ReducerObject() {
  const hi5Status = actionGenerator(GIVE_HI5);
  yield put(actionObjectGenerator(hi5Status.init));
}

export function* recognitionApi() {
  const status = actionGenerator(LIST_RECOGNITION_API);
  const hi5Status = actionGenerator(GIVE_HI5_API);
  yield takeLeading(status.success, getRecognitionList);
  yield takeLeading(hi5Status.success, giveHi5ToRecognition);
  yield takeLeading(hi5Status.init, resetHi5ReducerObject);
}

export default function* rootRecognitionSaga() {
  yield spawn(recognitionApi);
}