import React from "react";
import { render } from "@testing-library/react";

import PeerlyTextComponents from "shared-components/peerly-logo/PeerlyTextComponent";

it("should equal to Peerly text", () => {
  const { getByTestId } = render(<PeerlyTextComponents />);
  expect(getByTestId("PeerlyTextComponents")).toHaveTextContent("Peerly");
});
