import { takeEvery, call } from "redux-saga/effects";

import { recognitionApi, getRecognitionList } from "sagas/recognitionSaga";
import getJson from "utils/getJson";

describe("RECOGNITION SAGAS", () => {
  it("should dispatch action 'LIST_RECOGNITION_API' for recognition saga", () => {
    const generator = recognitionApi();
    expect(generator.next().value).toEqual(
      takeEvery("LIST_RECOGNITION_API", getRecognitionList)
    );
    const status = generator.next().done;
    expect(status).toEqual(true);
  });

  it("should dispatch action 'LIST_RECOGNITION_API' for fetch list", () => {
    const generator = getRecognitionList();
    expect(generator.next().value).toEqual(
      call(getJson, {
        path: "recognitions",
        apiToken: "",
      })
    );
    expect(generator.next().done).toEqual(false);
    expect(generator.next().done).toEqual(true);
  });
});
