import { takeEvery, spawn, call } from "redux-saga/effects";

import getJson from "utils/getJson";

function* getOrganisations() {
  try {
    const response = yield call(getJson, {
      path: "/api/users?page=2",
      signal: "",
      additionalHeaders: "",
    });
    return response;
  } catch (error) {
    return error;
  }
}

function* loginApi() {
  yield takeEvery("GET_ORGANISATIONS", getOrganisations);
}

export default function* rootSaga() {
  yield spawn(loginApi);
}
