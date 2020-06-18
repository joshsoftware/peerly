import React from "react";
import { render } from "@testing-library/react";

import RecognitionCardHeaderComponent from "recognition-list-components/RecognitionCardHeaderComponent";

describe("Recognition card header Component test", () => {
  test("should equal snapshot", () => {
    const { asFragment } = render(
      <RecognitionCardHeaderComponent
        givenForName="Roy"
        coreValue="positive"
        givenAt="Today 10:30 AM"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
