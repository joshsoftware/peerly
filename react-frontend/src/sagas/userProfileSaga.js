import { put, takeEvery, spawn, call, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import putJson from "utils/putJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import {
  USER_PROFILE,
  USER_PROFILE_API,
  USER_PROFILE_POST_API,
} from "constants/actionConstants";

export function* getUser() {
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const status = actionGenerator(USER_PROFILE);
  try {
    const response = yield call(getJson, {
      path: "/users/me",
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

export function* updateUser(action) {
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const status = actionGenerator(USER_PROFILE);
  try {
    const response = yield call(putJson, {
      path: "/users/me",
      paramsObj: action.payload,
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

export function* userProfileApi() {
  const status = actionGenerator(USER_PROFILE_API);
  yield takeEvery(status.success, getUser);
}

export function* userProfilePostApi() {
  const status = actionGenerator(USER_PROFILE_POST_API);
  yield takeEvery(status.success, updateUser);
}

export default function* userProfileSaga() {
  yield spawn(userProfileApi);
  yield spawn(userProfilePostApi);
}
