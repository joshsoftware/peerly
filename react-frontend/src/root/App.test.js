import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders basic app with dashboard link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
