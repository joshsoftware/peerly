import reducer from "reducers/recognitionReducer";

describe("recognition reducer", () => {
  it("recognition reducer should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      list: [{}],
      error: {},
    });
  });

  it("recognition reducer should handle 'GET_RECOGNITION_LIST_SUCCESS' action", () => {
    let reducerData = reducer(undefined, {
      type: "GET_RECOGNITION_LIST_SUCCESS",
      payload: [{ id: 1 }],
    });
    expect(reducerData).toEqual({
      list: [{ id: 1 }],
      error: {},
    });
  });
});
