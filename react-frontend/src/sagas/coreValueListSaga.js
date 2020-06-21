import {
  put,
  takeEvery,
  takeLatest,
  spawn,
  call,
  select,
} from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import PostJson from "utils/postJson";
import {
  CORE_VALUE_LIST,
  CORE_VALUE_API,
  RECOGNIZE_TO,
  RECOGNIZE_TO_API,
  ADD_RECOGNITION_API,
  ADD_RECOGNITION,
} from "constants/actionConstants";

export function* getRecognitionList() {
  const status = actionGenerator(CORE_VALUE_LIST);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  try {
    const response = yield call(getJson, {
      path: "/core_values",
      apiToken: token,
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

export function* getRecognitionTo(action) {
  const status = actionGenerator(RECOGNIZE_TO);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  try {
    const response = yield call(getJson, {
      path: "/users/" + action.payload + "",
      apiToken: token,
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

export function* addRecognition(action) {
  const actionStatus = actionGenerator(ADD_RECOGNITION);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  try {
    const response = yield call(PostJson, {
      path: "/recognitions",
      paramsObj: action.payload,
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      const dispatchObject = actionObjectGenerator(actionStatus.success, {
        status: response.status,
        value: responseObj.data,
      });
      yield put(dispatchObject);
    } else {
      const dispatchObject = actionObjectGenerator(actionStatus.failure, {
        status: response.status,
        value: responseObj.data,
      });
      yield put(dispatchObject);
    }
  } catch (error) {
    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      value: error,
    });
    yield put(dispatchObject);
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

export function* addRecognitionApi() {
  const status = actionGenerator(ADD_RECOGNITION_API);
  yield takeLatest(status.success, addRecognition);
}

export default function* coreValueList() {
  yield spawn(corevalueApi);
  yield spawn(recognizeToApi);
  yield spawn(addRecognitionApi);
}
