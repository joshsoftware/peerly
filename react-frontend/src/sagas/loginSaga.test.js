import { put, takeLatest, call } from "redux-saga/effects";
import { LOGIN_API, LOGIN } from "constants/actionConstants";
import { loginApi, userLogin } from "sagas/loginSaga";
import PostJson from "utils/postJson";
import actionGenerator from "utils/actionGenerator";
import SuccessResponse from "../../../mock-responses/login/success_response.json";
import UnauthorizedResponse from "../../../mock-responses/login/unauthorized_response.json";
import InternalServerError from "../../../mock-responses/login/internal_server_error.json";
import actionObjectGenerator from "actions/actionObjectGenerator";

describe("SAGAS test cases", () => {
  const actionStatus = actionGenerator(LOGIN);

  const mockRequest = {
    payload: {
      access_token: "xxxxx",
    },
  };

  it("should dispatch action 'LOGIN_API' ", () => {
    const actionStatus = actionGenerator(LOGIN_API);
    const generator = loginApi();
    expect(generator.next().value).toEqual(
      takeLatest(actionStatus.success, userLogin)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return with mock success result", () => {
    const response = { json: () => "success", status: 200 };
    const generator = userLogin(mockRequest);

    const dispatchObject = actionObjectGenerator(actionStatus.success, {
      status: response.status,
      value: SuccessResponse.data,
    });

    expect(generator.next().value).toEqual(
      call(PostJson, {
        path: "/oauth/google",
        paramsObj: { access_token: mockRequest.payload },
      })
    );
    generator.next(response).value;
    expect(generator.next(SuccessResponse).value).toEqual(put(dispatchObject));
    expect(generator.next().done).toBeTruthy();
  });

  it("should return with mock unauthorized error", () => {
    const response = { json: () => "unauthorized", status: 401 };
    const generator = userLogin(mockRequest);

    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      status: response.status,
      value: UnauthorizedResponse.message,
    });

    expect(generator.next().value).toEqual(
      call(PostJson, {
        path: "/oauth/google",
        paramsObj: { access_token: mockRequest.payload },
      })
    );
    generator.next(response).value;
    expect(generator.next(UnauthorizedResponse).value).toEqual(
      put(dispatchObject)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return with mock internal server error", () => {
    const response = { json: () => "internal server error", status: 500 };
    const generator = userLogin(mockRequest);

    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      status: response.status,
      value: InternalServerError.message,
    });
    expect(generator.next().value).toEqual(
      call(PostJson, {
        path: "/oauth/google",
        paramsObj: { access_token: mockRequest.payload },
      })
    );
    generator.next(response).value;
    expect(generator.next(InternalServerError).value).toEqual(
      put(dispatchObject)
    );
    expect(generator.next().done).toBeTruthy();
  });
});
