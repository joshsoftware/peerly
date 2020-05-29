import reducer from "reducers/loginReducer";
import expect from "expect";

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      data: { token: null },
      error: { message: null },
    });
  });

  it("should handle 'LOGIN_SUCCESS' action", () => {
    expect(
      reducer({}, { type: "LOGIN_SUCCESS", value: { token: "token" } })
    ).toEqual({
      data: {
        token: "token",
      },
    });
  });

  it("should handle 'LOGIN_FAILURE' action", () => {
    expect(
      reducer({}, { type: "LOGIN_FAILURE", value: { message: "error" } })
    ).toEqual({
      error: { message: "error" },
    });
  });
});
