import React from "react";
import { render } from "@testing-library/react";

import RecognitionListComponent from "recognition-list-components/RecognitionListComponent";
import recognitionList from "../../../mock-responses/recognition-listning/recognitionList.json";

describe("Recognition list Component test", () => {
  test("should equal snapshot", () => {
    const { asFragment } = render(
      <RecognitionListComponent
        recognitionList={recognitionList.recognitionList}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
