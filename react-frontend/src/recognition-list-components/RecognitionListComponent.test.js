import React from "react";
import { render } from "@testing-library/react";
import RecognitionListComponent from "recognition-list-components/RecognitionListComponent";

describe("Recognition list Component test", () => {
  test("should equal snapshot", () => {
    const { asFragment } = render(
      <RecognitionListComponent recognitionList={[]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
