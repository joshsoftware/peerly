import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "components/HomeComponent";

test("home component rendered", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/WELCOME TO PEERLY/i);
  expect(linkElement).toBeInTheDocument();
});
