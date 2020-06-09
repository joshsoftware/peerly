import React from "react";
import { render } from "@testing-library/react";

import "setupTests";
import PeerlyTextComponent from "shared-components/peerly-logo/PeerlyTextComponent";

it("should render PeerlyTextComponent", () => {
  const { asFragment } = render(
    <PeerlyTextComponent theme="dark" fontSize="48px" />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("should test color,fontsize and background of Peerly text", () => {
  const { getByTestId } = render(
    <PeerlyTextComponent theme="dark" fontSize="48px" />
  );
  expect(getByTestId("PeerlyTextComponents")).toHaveStyleRule(
    "color",
    "var(--white)"
  );
  expect(getByTestId("PeerlyTextComponents")).toHaveStyleRule(
    "font-size",
    "48px"
  );
  expect(getByTestId("PeerlyTextComponents")).toHaveStyleRule(
    "background-color",
    "var(--atomic)"
  );
});
