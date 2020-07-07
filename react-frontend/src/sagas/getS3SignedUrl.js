import { put, takeLatest, spawn, call, select } from "redux-saga/effects";
//import { put, takeLatest, call } from "redux-saga/effects";

import getJson from "utils/getJson";
import postJson from "utils/postJson";
import actionGenerator from "utils/actionGenerator";
import {
  S3_SIGNED_URL_API,
  S3_SIGNED_URL,
  S3_SIGNED_URL_POST,
} from "constants/actionConstants";
import actionObjectGenerator from "actions/actionObjectGenerator";

export function* gets3signedUrl(action) {
  let file_extension = action.payload.split(".").pop();
  const actionStatus = actionGenerator(S3_SIGNED_URL);
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  try {
    const response = yield call(getJson, {
      path: "/s3_signed_url?type=profile&file_type=" + file_extension + "",
      apiToken: token,
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      const dispatchObject = actionObjectGenerator(actionStatus.success, {
        status: response.status,
        s3_signed_url: responseObj.data.s3_signed_url,
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

export function* postS3signedUrl() {
  const actionStatus = actionGenerator(S3_SIGNED_URL);
  try {
    const response = yield call(postJson, {
      path: "/s3_signed_url?type=profile",
      apiToken: "",
    });
    const responseObj = yield response.json();
    if (responseObj.data) {
      const dispatchObject = actionObjectGenerator(actionStatus.success, {
        status: response.status,
        s3_signed_url: responseObj.data.s3_signed_url,
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

export function* s3SignedpostAPI() {
  const actionStatus = actionGenerator(S3_SIGNED_URL_POST);
  yield takeLatest(actionStatus.success, postS3signedUrl);
}

export function* s3SignedAPI() {
  const actionStatus = actionGenerator(S3_SIGNED_URL_API);
  yield takeLatest(actionStatus.success, gets3signedUrl);
}

export default function* getSignedUrl() {
  yield spawn(s3SignedAPI);
  yield spawn(s3SignedpostAPI);
}
