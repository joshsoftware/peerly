import { spawn } from "redux-saga/effects";
import recognitionSaga from "sagas/recognitionSaga";
import { loginApi } from "sagas/loginSaga";
import coreValueList from "sagas/coreValueListSaga";
import usersListSaga from "sagas/usersListSaga";
import userProfileSaga from "sagas/userProfileSaga";

export function* helloSaga() {
  const msg = yield "Hello Sagas!";
  // eslint-disable-next-line no-console
  console.info(msg);
}

export default function* rootSaga() {
  yield spawn(helloSaga);
  yield spawn(recognitionSaga);
  yield spawn(loginApi);
  yield spawn(coreValueList);
  yield spawn(usersListSaga);
  yield spawn(userProfileSaga);
}
