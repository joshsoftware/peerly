import reducer from "reducers/loginReducer";
import expect from "expect";

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({ token: null });
  });

  it("should handle 'LOGIN_SUCCESS' action", () => {
    expect(reducer({}, { type: "LOGIN_SUCCESS", value: "token" })).toEqual(
      "token"
    );
  });

  it("should handle 'LOGIN_FAILURE' action", () => {
    expect(reducer({}, { type: "LOGIN_FAILURE", value: "error" })).toEqual(
      "error"
    );
  });
});
