import React from "react";
import { render } from "@testing-library/react";
import ButtonComponent from "components/core/Button/ButtonComponent";

it("ButtonComponent should equal to submit text", () => {
  const { getByText } = render(<ButtonComponent text="submit" type="submit" />);
  expect(getByText("submit")).toHaveTextContent("submit");
});