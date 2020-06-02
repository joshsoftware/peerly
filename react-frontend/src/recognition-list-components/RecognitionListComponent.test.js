import React from "react";
import { render } from "@testing-library/react";
import RecognitionListComponent from "recognition-list-components/RecognitionListComponent";

it("should render card", () => {
  const { getByTestId } = render(
    <RecognitionListComponent recognitionList={[]} />
  );
  const testComponent = getByTestId("RecognitionCard");
  expect(testComponent).toBeInTheDocument();
});
