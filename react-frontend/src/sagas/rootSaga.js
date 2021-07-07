import { spawn } from "redux-saga/effects";
import recognitionSaga from "sagas/recognitionSaga";

export function* helloSaga() {
  const msg = yield "Hello Sagas!";
  // eslint-disable-next-line no-console
  console.info(msg);
}

export default function* rootSaga() {
  yield spawn(helloSaga);
  yield spawn(recognitionSaga);
}
