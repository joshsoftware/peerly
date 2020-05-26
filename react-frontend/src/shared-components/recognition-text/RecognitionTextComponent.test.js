import React from "react";
import { render } from "@testing-library/react";

import TextAreaComponent from "./TextAreaComponent";

it("LabelComponent should equal to text", () => {
  const { getByText } = render(<TextAreaComponent text="text" />);
  expect(getByText("text")).toHaveTextContent("text");
});
