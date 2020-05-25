import { takeEvery } from "redux-saga/effects";
import { loginApi, userLogin } from "sagas/loginSaga";

describe("SAGAS", () => {
  it("should dispatch action 'LOGIN_API' ", () => {
    const generator = loginApi();
    expect(generator.next().value).toEqual(takeEvery("LOGIN_API", userLogin));
    expect(generator.next().done).toBeTruthy();
  });
});
