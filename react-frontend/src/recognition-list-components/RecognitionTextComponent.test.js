import React from "react";
import { render } from "@testing-library/react";

import RecognitionTextComponent from "recognition-list-components/RecognitionTextComponent";

describe("Recognition text Component component test", () => {
  test("should equal to recognition name", () => {
    const { getByText } = render(
      <RecognitionTextComponent
        text="give high five for good work"
        given_by="avinash"
      />
    );
    expect(getByText("avinash")).toHaveTextContent("avinash");
  });

  test("should equal to recognition text", () => {
    const { getByText } = render(
      <RecognitionTextComponent
        text="give high five for good work"
        given_by="avinash"
      />
    );
    expect(getByText("give high five for good work")).toHaveTextContent(
      "give high five for good work"
    );
  });

  test("render image component", () => {
    const { getByAltText } = render(
      <RecognitionTextComponent
        text="give high five for good work"
        given_by="avinash"
      />
    );
    expect(getByAltText("Profile")).toBeInTheDocument();
  });
});
