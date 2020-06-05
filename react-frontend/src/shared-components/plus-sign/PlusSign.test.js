import React from "react";
import { render } from "@testing-library/react";

import "setupTests";
import PlusSign from "shared-components/plus-sign/PlusSign";

it("should render plus sign component", () => {
  const { asFragment } = render(
    <PlusSign theme="dark" cross fontSize="48px" />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should test color,fontsize and cross of plus sign", () => {
  const { getByTestId } = render(
    <PlusSign theme="dark" cross fontSize="48px" />
  );
  expect(getByTestId("plusSignText")).toHaveStyleRule("color", "var(--white)");
  expect(getByTestId("plusSignText")).toHaveStyleRule("font-size", "48px");
  expect(getByTestId("plusSignText")).toHaveStyleRule(
    "transform",
    "rotate(45deg)"
  );
});
