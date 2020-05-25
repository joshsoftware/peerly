import React from "react";
import { render } from "@testing-library/react";

import Button from "core-components/button/ButtonComponent";

it("ButtonComponent should equal to submit text", () => {
  const { getByText } = render(<Button type="submit">submit</Button>);
  expect(getByText("submit")).toHaveTextContent("submit");
});
