import React from "react";
import { render } from "@testing-library/react";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

describe("Recognition Card Component test", () => {
  test("render menu button", () => {
    const { getByText } = render(
      <RecognitionCardComponent
        given_at="today 3:00AM"
        given_by="roy"
        given_for="jack"
        text="good work"
        core_value="positive"
        high_five_count="1"
      />
    );
    expect(getByText("...")).toHaveTextContent("...");
  });

  test("render high five icon", () => {
    const { getByAltText } = render(
      <RecognitionCardComponent
        given_at="today 3:00AM"
        given_by="roy"
        given_for="jack"
        text="good work"
        core_value="positive"
        high_five_count="1"
      />
    );
    const testImage = getByAltText("High five recognition");
    expect(testImage).toBeInTheDocument();
  });

  test("render recognition card header component", () => {
    const { getByText } = render(
      <RecognitionCardComponent
        given_at="today 3:00AM"
        given_by="roy"
        given_for="jack"
        text="give high five for good work"
        core_value="good work"
        high_five_count="1"
      />
    );
    expect(getByText("today 3:00AM")).toHaveTextContent("today 3:00AM");
    expect(getByText("jack")).toHaveTextContent("jack");
  });

  test("render recognition text component", () => {
    const { getByText } = render(
      <RecognitionCardComponent
        given_at="today 3:00AM"
        given_by="roy"
        given_for="jack"
        text="give high five for good work"
        core_value="good work"
        high_five_count="1"
      />
    );
    expect(getByText("roy")).toHaveTextContent("roy");
    expect(getByText("give high five for good work")).toHaveTextContent(
      "give high five for good work"
    );
  });
});
