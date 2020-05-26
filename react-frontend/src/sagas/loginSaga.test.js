import { takeEvery, call } from "redux-saga/effects";
import { loginApi, userLogin } from "sagas/loginSaga";
import PostJson from "utils/postJson";

describe("SAGAS", () => {
  it("should dispatch action 'LOGIN_API' ", () => {
    const generator = loginApi();
    expect(generator.next().value).toEqual(takeEvery("LOGIN_API", userLogin));
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action 'LOGIN_API' with result from fetch users API", () => {
    const mockResponse = {
      type: "LOGIN_API",
      payload: {
        access_token: "Some content",
      },
    };
    const generator = userLogin(mockResponse);
    expect(generator.next().value).toEqual(
      call(PostJson, {
        path: "http://localhost:3120/oauth/google",
        apiToken: "",
        signal: "",
        additionalHeaders: "",
        paramsObj: { access_token: mockResponse.payload },
      })
    );
    generator.next();
    expect(generator.next().done).toEqual(true);
  });
});
