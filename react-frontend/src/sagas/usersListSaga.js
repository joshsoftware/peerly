import { put, takeEvery, spawn, call, select } from "redux-saga/effects";

import getJson from "utils/getJson";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LIST_USERS, LIST_USERS_API } from "constants/actionConstants";

export function* usersList() {
  const getToken = (state) => state.loginReducer.data.token;
  const token = yield select(getToken);
  const status = actionGenerator(LIST_USERS);
  const listReducer = yield select((state) => state.userListReducer);

  try {
    const response = yield call(getJson, {
      path: "/users",
      apiToken: token,
      paramsObj: {
        limit: listReducer.limit,
        offset: listReducer.offset,
      },
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

      //yield put(actionObjectGenerator(status.success, responseObj.data));
    } else {
      yield put(actionObjectGenerator(status.failure, responseObj.error));
    }
  } catch (error) {
    yield put(actionObjectGenerator(status.failure, error));
  }
}

export function* usersListApi() {
  const status = actionGenerator(LIST_USERS_API);
  yield takeEvery(status.success, usersList);
}

export default function* usersListSaga() {
  yield spawn(usersListApi);
}
