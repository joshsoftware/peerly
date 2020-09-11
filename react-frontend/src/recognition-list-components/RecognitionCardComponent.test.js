import React from "react";
import { render } from "@testing-library/react";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

describe("Recognition Card Component test", () => {
  test("should equal snapshot", () => {
    const { asFragment } = render(
      <RecognitionCardComponent
        givenByName="Roy"
        givenForName="David"
        givenAt="Today 10:30 AM"
        coreValue="positive"
        text="give high five for good work"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
