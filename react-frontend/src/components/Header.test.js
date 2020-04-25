import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Header from "components/Header";

test("home component rendered", () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/WELCOME TO PEERLY/i);
  expect(linkElement).toBeInTheDocument();
});
