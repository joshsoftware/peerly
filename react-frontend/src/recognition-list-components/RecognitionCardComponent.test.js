import React from "react";
import { render } from "@testing-library/react";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

const recognition = {
  given_for: "Avinash Mane",
  given_by: "Avinash Patil",
  given_at: "today at 5:37 pm",
  text: "i give high five to avinash for writing block",
  core_value: "write a block",
  highFiveCount: 1,
};

describe("Recognition Card Component test", () => {
  test("render menu button", () => {
    const { getByText } = render(
      <RecognitionCardComponent recognition={recognition} />
    );
    expect(getByText("...")).toHaveTextContent("...");
  });

  test("render high five icon", () => {
    const { getByAltText } = render(
      <RecognitionCardComponent recognition={recognition} />
    );
    const testImage = getByAltText("High five recognition");
    expect(testImage).toBeInTheDocument();
  });
});
