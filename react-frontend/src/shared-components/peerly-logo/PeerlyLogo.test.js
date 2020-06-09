import React from "react";
import { render } from "@testing-library/react";

import "setupTests";
import PeerlyLogo from "shared-components/peerly-logo/PeerlyLogo";

it("should render PeerlyLogo Component", () => {
  const { asFragment } = render(<PeerlyLogo theme="dark" fontSize="48px" />);
  expect(asFragment()).toMatchSnapshot();
});

test("should test color,fontsize and background of Peerly Logo", () => {
  const { getByTestId } = render(<PeerlyLogo theme="dark" />);
  expect(getByTestId("Logo")).toHaveStyleRule(
    "border",
    "3px solid var(--white)"
  );
  expect(getByTestId("Logo")).toHaveStyleRule(
    "background-color",
    "var(--atomic)"
  );
});
