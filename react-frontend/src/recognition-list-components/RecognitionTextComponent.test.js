import React from "react";
import { render } from "@testing-library/react";

import RecognitionTextComponent from "recognition-list-components/RecognitionTextComponent";

describe("Recognition text Component test", () => {
  test("should equal snapshot", () => {
    const { asFragment } = render(
      <RecognitionTextComponent givenByName="Roy" text="give high five" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
