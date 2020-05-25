import React from "react";
import { render } from "@testing-library/react";
import LabelComponent from "core-components/label/LabelComponent";

it("LabelComponent should equal to submit text", () => {
  const { getByText } = render(<LabelComponent text="submit" />);
  expect(getByText("submit")).toHaveTextContent("submit");
});
