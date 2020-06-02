import React from "react";
import { render } from "@testing-library/react";

import RecognitionTopBarComponent from "recognition-list-components/RecognitionTopBarComponent";

describe("Recognition TopBar Component test", () => {
  test("should equal to recognition name", () => {
    const { getByText } = render(
      <RecognitionTopBarComponent
        given_at="today 3:00 AM"
        given_for="avinash"
        core_value="positive"
      />
    );
    expect(getByText("avinash")).toHaveTextContent("avinash");
  });

  test("should equal to recognition time", () => {
    const { getByText } = render(
      <RecognitionTopBarComponent
        given_at="today 3:00 AM"
        given_for="avinash"
        core_value="positive"
      />
    );
    expect(getByText("today 3:00 AM")).toHaveTextContent("today 3:00 AM");
  });

  test("render image component", () => {
    const { getByAltText } = render(
      <RecognitionTopBarComponent
        given_at="today 3:00 AM"
        given_for="avinash"
        core_value="positive"
      />
    );
    expect(getByAltText("Profile")).toBeInTheDocument();
  });
});
