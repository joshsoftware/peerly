import React from "react";
import { render } from "@testing-library/react";
import LoginPanel from "./LoginPanel";

it("should equal to value", () => {
  const { getByText } = render(<LoginPanel />);
  expect(getByText("Peerly")).toHaveTextContent("Peerly");
});
