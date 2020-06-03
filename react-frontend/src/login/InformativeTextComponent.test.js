import React from "react";
import { render } from "@testing-library/react";
import InformativeTextComponent from "login/InformativeTextComponent";

it("should render informative text component", () => {
  const { asFragment } = render(
    <InformativeTextComponent
      informativeText="Lets Create the Office Positive"
      encouragementThought="thought"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
