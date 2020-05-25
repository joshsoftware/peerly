import test from "tape";

import { takeEvery, put, call } from "redux-saga/effects";
import { loginApi, userLogin } from "sagas/loginSaga";
import PostJson from "utils/postJson";
/*eslint-disable jest/expect-expect*/

test("authorize user login", (t /*eslint-disable-line jest/no-test-callback */) => {
  const generatorObj = loginApi();
  t.deepEqual(
    generatorObj.next().value,
    takeEvery("LOGIN_API", userLogin),
    "login function gets call"
  );

  const action = "xxxxx";
  const generator = userLogin(action);
  t.deepEqual(
    generator.next().value,
    call(PostJson, {
      path: "http://localhost:3120/oauth/google",
      apiToken: "",
      signal: "",
      additionalHeaders: "",
      paramsObj: { access_token: action },
    }),
    "must call fetchPostsApi"
  );

  t.deepEqual(
    generator.next().value,
    put({ type: "LOGIN_SUCCESS", value: "responseObj.data" })
  );

  t.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    "api call Saga must be done"
  );

  t.end();
});
