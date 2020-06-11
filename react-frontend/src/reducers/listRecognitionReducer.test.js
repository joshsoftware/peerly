import reducer, { defaultState } from "reducers/listRecognitionReducer";
import actionGenerator from "utils/actionGenerator";
import actionObjectGenerator from "actions/listRecognitionAction";

describe("list recognition reducer", () => {
  const status = actionGenerator("LIST_RECOGNITION");

  it("list recognition reducer should return the initial state", () => {
    expect(reducer(defaultState, {})).toEqual({
      list: [
        {
          core_value: {},
          givenFor: {},
          givenBy: {},
        },
      ],
      error: {
        fields: {},
      },
    });
  });

  it("list recognition reducer should handle success action", () => {
    let reducerData = reducer(
      defaultState,
      actionObjectGenerator(status.success, [{ id: 1 }])
    );
    expect(reducerData).toEqual({
      list: [{ id: 1 }],
      error: {
        fields: {},
      },
    });
  });

  it("list recognition reducer should handle failure action", () => {
    let reducerData = reducer(
      defaultState,
      actionObjectGenerator(status.failure, { code: "invalid token" })
    );
    expect(reducerData).toEqual({
      list: [
        {
          core_value: {},
          givenFor: {},
          givenBy: {},
        },
      ],
      error: { code: "invalid token" },
    });
  });
});
