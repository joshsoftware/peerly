import React from "react";
import { render } from "@testing-library/react";
import InformativeTextComponent from "login/InformativeTextComponent";

it("should equal informative text", () => {
  const { getByText } = render(
    <InformativeTextComponent
      InformativeText="Lets Create the Office Positive"
      encouragementThought="thought"
    />
  );
  expect(getByText("Lets Create the Office Positive")).toHaveTextContent(
    "Lets Create the Office Positive"
  );
  expect(getByText("thought")).toHaveTextContent("thought");
});
