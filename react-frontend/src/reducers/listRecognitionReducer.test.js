import reducer, { defaultState } from "reducers/listRecognitionReducer";
import actionGenerator from "utils/actionGenerator";

describe("list recognition reducer", () => {
  const status = actionGenerator("LIST_RECOGNITION");

  it("list recognition reducer should return the initial state", () => {
    expect(reducer(defaultState, {})).toEqual({
      list: [{}],
      error: {},
    });
  });

  it("list recognition reducer should handle success action", () => {
    let reducerData = reducer(defaultState, {
      type: status.success,
      payload: [{ id: 1 }],
    });
    expect(reducerData).toEqual({
      list: [{ id: 1 }],
      error: {},
    });
  });

  it("list recognition reducer should handle failure action", () => {
    let reducerData = reducer(defaultState, {
      type: status.failure,
      payload: { code: "invalid token" },
    });
    expect(reducerData).toEqual({
      list: [{}],
      error: { code: "invalid token" },
    });
  });
});
