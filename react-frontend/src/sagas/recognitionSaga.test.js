import { takeEvery, call } from "redux-saga/effects";

import { recognitionApi, getRecognitionList } from "sagas/recognitionSaga";
import getJson from "utils/getJson";

describe("RECOGNITION SAGAS", () => {
  it("should dispatch action 'RECOGNITION_GET_API' for recognition saga", () => {
    const generator = recognitionApi();
    expect(generator.next().value).toEqual(
      takeEvery("RECOGNITION_GET_API", getRecognitionList)
    );
    const status = generator.next().done;
    expect(status).toBeTruthy();
  });

  it("should dispatch action 'RECOGNITION_GET_API' with result from fetch get list API", () => {
    const generator = getRecognitionList();

    expect(generator.next().value).toEqual(
      call(getJson, {
        path: "recognitions",
        apiToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjE5LCJhdWQiOiJwZWVybHkuY29tIiwibmJmIjoxNTkwNjM2NDUyLCJodHRwczovL3BlZXJseS5jb20iOnsicm9sZUlkIjozLCJvcmdJZCI6Mywib3JnTmFtZSI6Impvc2gifSwiaWF0IjoxNTkwNjM2NDUyLCJleHAiOjE1OTA2NzI0NTJ9.MKkukGmgx9RHyFm_dfrGp8j_W09fBU8Qy9EzPXXcv3w",
      })
    );
  });
});
