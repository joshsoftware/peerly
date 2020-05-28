import reducer, { defaultState } from "reducers/listRecognitionReducer";
import actionGenerator from "utils/actionGenerator";

describe("recognition reducer", () => {
  const status = actionGenerator("LIST_RECOGNITION");

  it("recognition reducer should return the initial state", () => {
    expect(reducer(defaultState, {})).toEqual({
      list: [{}],
      error: {},
    });
  });

  it("recognition reducer should handle 'GET_RECOGNITION_LIST_SUCCESS' action", () => {
    let reducerData = reducer(defaultState, {
      type: status.success,
      payload: [{ id: 1 }],
    });
    expect(reducerData).toEqual({
      list: [{ id: 1 }],
      error: {},
    });
  });

  it("recognition reducer should handle 'GET_RECOGNITION_LIST_FAILURE' action", () => {
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
