import expect from "expect";

import reducer from "reducers/loginReducer";
import actionGenerator from "utils/actionGenerator";

const actionStatus = actionGenerator("LOGIN");

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      status: null,
      data: { token: null },
      error: { message: null },
    });
  });

  it("should handle 'LOGIN_SUCCESS' action", () => {
    expect(
      reducer(
        {},
        {
          type: actionStatus.success,
          payload: {
            status: 200,
            value: { token: "token" },
          },
        }
      )
    ).toEqual({
      status: 200,
      data: {
        token: "token",
      },
    });
  });

  it("should handle 'LOGIN_FAILURE' action with 401 status code", () => {
    expect(
      reducer(
        {},
        {
          type: actionStatus.failure,
          payload: {
            status: 401,
            value: { message: "unauthorized user" },
          },
        }
      )
    ).toEqual({
      status: 401,
      error: { message: "unauthorized user" },
    });
  });

  it("should handle 'LOGIN_FAILURE' action with 500 status code", () => {
    expect(
      reducer(
        {},
        {
          type: actionStatus.failure,
          payload: {
            status: 500,
            value: { message: "internal server error" },
          },
        }
      )
    ).toEqual({
      status: 500,
      error: { message: "internal server error" },
    });
  });
});
