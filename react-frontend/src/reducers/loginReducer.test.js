import expect from "expect";

import reducer, { defaultState } from "reducers/loginReducer";
import actionGenerator from "utils/actionGenerator";
import actionObjectGenerator from "actions/actionObjectGenerator";
import { LOGIN } from "constants/actionConstants";
const actionStatus = actionGenerator(LOGIN);

describe("login reducer test cases", () => {
  it("should return the initial state", () => {
    expect(reducer(defaultState, {})).toEqual({
      status: null,
      data: { token: null },
      error: { message: null },
    });
  });

  it("should handle 'LOGIN_SUCCESS' action", () => {
    const dispatchObject = actionObjectGenerator(actionStatus.success, {
      status: 200,
      value: { token: "token" },
    });
    expect(reducer(defaultState, dispatchObject)).toEqual({
      status: 200,
      data: {
        token: "token",
      },
      error: { message: null },
    });
  });

  it("should handle 'LOGIN_FAILURE' action with 401 status code", () => {
    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      status: 401,
      value: { message: "unauthorized user" },
    });
    expect(reducer(defaultState, dispatchObject)).toEqual({
      status: 401,
      data: { token: null },
      error: { message: "unauthorized user" },
    });
  });

  it("should handle 'LOGIN_FAILURE' action with 500 status code", () => {
    const dispatchObject = actionObjectGenerator(actionStatus.failure, {
      status: 500,
      value: { message: "internal server error" },
    });
    expect(reducer(defaultState, dispatchObject)).toEqual({
      status: 500,
      data: { token: null },
      error: { message: "internal server error" },
    });
  });
});
