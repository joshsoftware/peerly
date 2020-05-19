import React from "react";
import { render } from "@testing-library/react";
import LabelComponent from "components/core/Label/LabelComponent";

it("LabelComponent should equal to submit text", () => {
  const { getByText } = render(
    <LabelComponent className="text-info" text="submit" />
  );
  expect(getByText("submit")).toHaveTextContent("submit");
});
