import { takeEvery, call, put } from "redux-saga/effects";

import { recognitionApi, getRecognitionList } from "sagas/recognitionSaga";
import getJson from "utils/getJson";
import actionGenerator from "utils/actionGenerator";
import success_mockResponse from "../../../mock-responses/recognitions/get_api_call_success_response.json";
import failure_mockResponse from "../../../mock-responses/recognitions/get_api_call_failure_response.json";
import {
  LIST_RECOGNITION_API,
  LIST_RECOGNITION,
} from "constants/actionConstants.js";
import actionObjectGenerator from "actions/listRecognitionAction";

describe("RECOGNITION SAGAS", () => {
  const status = actionGenerator(LIST_RECOGNITION);
  const apiStatus = actionGenerator(LIST_RECOGNITION_API);
  const response = { json: () => "success" };

  it("should dispatch action 'LIST_RECOGNITION_API' for recognition saga", () => {
    const generator = recognitionApi();
    expect(generator.next().value).toEqual(
      takeEvery(apiStatus.success, getRecognitionList)
    );
    const status = generator.next().done;
    expect(status).toEqual(true);
  });

  it("should dispatch action 'LIST_RECOGNITION_API' for fetch list with 200 status", () => {
    const generator = getRecognitionList();
    const callFunctionDefination = generator.next().value;

    expect(callFunctionDefination).toEqual(
      call(getJson, {
        path: "recognitions",
        apiToken: "",
      })
    );
    generator.next(response).value;
    expect(generator.next(success_mockResponse).value).toEqual(
      put(actionObjectGenerator(status.success, success_mockResponse.data))
    );
    expect(generator.next().done).toEqual(true);
  });

  it("should dispatch action 'LIST_RECOGNITION_API' for fetch list with 401 error response", () => {
    const generator = getRecognitionList();
    const callFunctionDefination = generator.next().value;
    expect(callFunctionDefination).toEqual(
      call(getJson, {
        path: "recognitions",
        apiToken: "",
      })
    );
    expect(generator.next(response).value).toEqual("success");
    expect(generator.next(failure_mockResponse).value).toEqual(
      put(actionObjectGenerator(status.failure, failure_mockResponse.error))
    );
    expect(generator.next().done).toEqual(true);
  });
});
